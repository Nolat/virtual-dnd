import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Game, GameUser, User } from "../models";

@Resolver(() => Game)
export class GameResolver {
  @Query(() => Game, {
    name: "Game",
    nullable: true
  })
  getGame(@Arg("gameId") id: string): Promise<Game | undefined> {
    return Game.findOne(id, { relations: ["master", "gameUsers", "gameUsers.user"] });
  }

  @Mutation(() => Game, {
    name: "CreateGame",
    nullable: true
  })
  async createGame(
    @Arg("userId") userId: string,
    @Arg("name") name: string,
    @Arg("password", { nullable: true }) password?: string
  ): Promise<Game | undefined> {
    try {
      const user = await User.findOne(userId);

      const game = new Game();
      game.name = name;
      game.password = password;
      game.master = user;
      await game.save();

      const gameUser = new GameUser();
      gameUser.user = user;
      gameUser.game = game;
      await gameUser.save();

      return game;
    } catch (_) {
      console.log("Error with creating game");
    }
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
