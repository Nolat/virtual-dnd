import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Game, GameUser } from "../models";
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
  getGame(@Arg("id") id: string): Promise<Game | undefined> {
    return this.gameRepository.findOne(id);
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
  ): Promise<Game | undefined> {
    try {
      const game = this.gameRepository.create({ name, password, master: user });
      await game.save();

      const gameUser = this.gameUserRepository.create({ user, game });
      await gameUser.save();

      return game;
    } catch (_) {
      console.log("Error with creating game");
    }
  }
}
