import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "decorators/current-user.decorator";
import { AuthGuard } from "guard/auth.guard";
import { Game, GameUser, User } from "models";

import { JoinGameInput } from "./game-user.input";
import { GameUserInfo } from "./game-user.output";
import { GameUserService } from "./game-user.service";

@Resolver(() => GameUser)
export class GameUserResolver {
  constructor(private readonly gameUserService: GameUserService) {}

  @UseGuards(AuthGuard)
  @Query(() => GameUser, { name: "GameUser", nullable: true })
  async getGameUser(@CurrentUser() user: User, @Args("id") id: string): Promise<GameUser> {
    return this.gameUserService.findByGameAndUser({ gameId: id, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Query(() => GameUserInfo, { name: "GameUserInfo", nullable: true })
  async getGameUserInfo(@CurrentUser() user: User, @Args("id") id: string): Promise<GameUserInfo> {
    return this.gameUserService.getInfo(user, id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Game, {
    name: "JoinGame",
    nullable: true
  })
  async joinGame(@CurrentUser() user: User, @Args("input") input: JoinGameInput): Promise<Game> {
    return this.gameUserService.join(user, input);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, {
    name: "LeaveGame",
    nullable: true
  })
  async leaveGame(@CurrentUser() user: User, @Args("id") id: string): Promise<boolean> {
    return this.gameUserService.leave(user, id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GameUser, {
    name: "UpdateGameUserName",
    nullable: true
  })
  async updateGameUserName(
    @CurrentUser() user: User,
    @Args("id") id: string,
    @Args("name") name: string
  ): Promise<GameUser> {
    return this.gameUserService.updateName(user, id, name);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GameUser, {
    name: "UpdateGameUserColor",
    nullable: true
  })
  async updateGameUserColor(
    @CurrentUser() user: User,
    @Args("id") id: string,
    @Args("color") color: string
  ): Promise<GameUser> {
    return this.gameUserService.updateColor(user, id, color);
  }
}
