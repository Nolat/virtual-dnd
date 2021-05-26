import { UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription
} from "@nestjs/graphql";

import { CurrentUser } from "decorators/current-user.decorator";
import { AuthGuard } from "guard/auth.guard";
import { Game, GameUser, User } from "models";
import { subscriptionIterator } from "utils/pub-sub";

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

  @ResolveField(() => [User], { name: "users", nullable: true })
  async getUsers(@Parent() game: Game): Promise<User[]> {
    return this.gameService.getUsers(game.id);
  }

  @ResolveField(() => [GameUser], { name: "onlinePlayers", nullable: true })
  async getOnlinePlayers(@Parent() game: Game): Promise<GameUser[]> {
    return this.gameService.getOnlinePlayers(game.id);
  }

  @UseGuards(AuthGuard)
  @Subscription(() => [GameUser], { name: "onlinePlayersChanged", nullable: true })
  async onlinePlayersChanged(@Args("id") id: string, @CurrentUser() user: User) {
    this.gameService.connectUserToGame(id, user.id);

    return subscriptionIterator(`onlinePlayersChanged-${id}`, async () => {
      await this.gameService.disconnectUserFromGame(id, user.id);
    });
  }
}
