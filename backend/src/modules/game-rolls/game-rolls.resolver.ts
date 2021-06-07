import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "decorators/current-user.decorator";
import { AuthGuard } from "guard/auth.guard";
import Game from "models/game.model";
import User from "models/user.model";

import { RollDiceInput } from "./game-rolls.input";
import { RollDiceResult } from "./game-rolls.output";
import { GameRollsService } from "./game-rolls.service";

@Resolver(() => Game)
export class GameRollsResolver {
  constructor(private readonly gameRollsService: GameRollsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => RollDiceResult, {
    name: "RollDice",
    nullable: true
  })
  async rollDice(
    @Args("input") input: RollDiceInput,
    @CurrentUser() user: User
  ): Promise<RollDiceResult> {
    return this.gameRollsService.rollStandardDice(input, user);
  }
}
