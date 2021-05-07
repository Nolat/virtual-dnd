import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Game, User } from "../models";

@Resolver(() => Game)
export class GameResolver {
  @Query(() => Game, {
    name: "Game",
    nullable: true
  })
  getGame(@Arg("gameId") id: string): Promise<Game | undefined> {
    return Game.findOne(id);
  }

  @Mutation(() => Game, {
    name: "CreateGame",
    nullable: true
  })
  async createGame(
    @Arg("userId") userId: string,
    @Arg("password", { nullable: true }) password?: string
  ): Promise<Game | undefined> {
    const game = new Game();
    game.password = password;
    game.master = await User.findOne(userId);

    return game.save();
  }

  @Query(() => Boolean, {
    name: "isGM",
    nullable: true
  })
  async userIsGM(
    @Arg("user") userId: string,
    @Arg("gameId") id: string
  ): Promise<boolean | undefined> {
    const game = await Game.findOne(id, {
      relations: ["master"]
    });

    return game.master.id === userId;
  }
}
