import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "decorators/current-user.decorator";
import { AuthGuard } from "guard/auth.guard";
import { Game, GameUser, User } from "modules/database/models";

import { JoinGameInput } from "./game-user.input";
import { GameUserInfo } from "./game-user.output";
import { GameUserService } from "./game-user.service";

@Resolver(() => GameUser)
export class GameUserResolver {
  constructor(private readonly gameUserService: GameUserService) {}

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
}
