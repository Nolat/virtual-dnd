import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "decorators/current-user.decorator";
import { AuthGuard } from "guard/auth.guard";
import { Game, User } from "modules/database/models";

import { CreateGameInput } from "./game.input";
import { GameService } from "./game.service";

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => Game, {
    name: "Game",
    nullable: true
  })
  getGame(@Args("id") id: string): Promise<Game> {
    return this.gameService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Game, {
    name: "CreateGame",
    nullable: true
  })
  async createGame(
    @CurrentUser() user: User,
    @Args("input") input: CreateGameInput
  ): Promise<Game> {
    return this.gameService.create(input, user);
  }

  @ResolveField(() => [User], { nullable: true })
  async users(@Parent() game: Game): Promise<User[]> {
    const gameUsers = (await this.gameService.findById(game.id)).gameUsers;

    return gameUsers.map((gu) => gu.user);
  }
}
