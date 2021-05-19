import { ApolloError } from "apollo-server-micro";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Game, GameUser } from "../models";
import { JoinGameInfo } from "../outputs";
import { APIContext } from "../types/APIContext";

@Resolver(() => Game)
export class GameResolver {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(GameUser) private readonly gameUserRepository: Repository<GameUser>
  ) {}

  @Query(() => Game, {
    name: "Game",
    nullable: true
  })
  getGame(@Arg("id") id: string): Promise<Game> {
    return this.gameRepository.findOne({ where: { id } });
  }

  @Authorized()
  @Query(() => JoinGameInfo, { name: "JoinGameInfo", nullable: true })
  async getGameInfoBeforeJoining(
    @Ctx() { user }: APIContext,
    @Arg("id") id: string
  ): Promise<JoinGameInfo> {
    const game = await this.gameRepository.findOne({ where: { id } });

    if (!game) throw new ApolloError("Game not found", "GAME_NOT_FOUND");

    const gameUser = await this.gameUserRepository.findOne({ user, game });

    return {
      userId: user.id,
      gameId: game.id,
      hasJoined: !!gameUser,
      hasPassword: !!game.password
    };
  }

  @Authorized()
  @Mutation(() => Game, {
    name: "CreateGame",
    nullable: true
  })
  async createGame(
    @Ctx() { user }: APIContext,
    @Arg("name") name: string,
    @Arg("password", { nullable: true }) password?: string
  ): Promise<Game> {
    const game = this.gameRepository.create({ name, password, master: user });
    await game.save();

    const gameUser = this.gameUserRepository.create({ user, game });
    await gameUser.save();

    return this.gameRepository.findOne(game.id, { relations: ["gameUsers", "master"] });
  }

  @Authorized()
  @Mutation(() => Game, {
    name: "JoinGame",
    nullable: true
  })
  async joinGame(
    @Ctx() { user }: APIContext,
    @Arg("id") id: string,
    @Arg("password", { nullable: true }) password?: string
  ): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { id } });

    if (!game) throw new ApolloError("Game not found", "GAME_NOT_FOUND");
    if (game.password && game.password !== password)
      throw new ApolloError("Wrong password", "WRONG_PASSWORD");

    let gameUser = await this.gameUserRepository.findOne({ user, game });
    if (!gameUser) {
      gameUser = this.gameUserRepository.create({ user, game });
      await gameUser.save();
    }

    return this.gameRepository.findOne(game.id, { relations: ["gameUsers", "master"] });
  }

  @Authorized()
  @Mutation(() => Boolean, {
    name: "LeaveGame",
    nullable: true
  })
  async leaveGame(@Ctx() { user }: APIContext, @Arg("id") id: string): Promise<boolean> {
    const game = await this.gameRepository.findOne({ where: { id }, relations: ["master"] });
    if (!game) throw new ApolloError("Game not found", "GAME_NOT_FOUND");

    // TODO: Pour le moment, le GM ne peux pas leave ses games
    if (game.master.id === user.id) return false;

    const gameUser = await this.gameUserRepository.findOne({ user, game });
    if (!gameUser) return false;

    await this.gameUserRepository.remove(gameUser);
    return true;
  }
}
