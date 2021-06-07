import { Inject, Injectable, forwardRef } from "@nestjs/common";

import User from "models/user.model";
import { RollMessage } from "modules/game-chat/game-chat.output";
import { GameUserService } from "modules/game-user/game-user.service";
import { SubscriptionService } from "modules/subscription/subscription.service";

import { RollInput } from "./game-roll.types";
import { DiceType, RollDiceInput } from "./game-rolls.input";
import { DiceResult, RollDiceResult } from "./game-rolls.output";

@Injectable()
export class GameRollsService {
  constructor(
    @Inject(forwardRef(() => GameUserService))
    private readonly gameUserService: GameUserService,
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService
  ) {}

  async rollStandardDice(input: RollDiceInput, user: User) {
    const rolls: RollInput[] = input.rolls.map((r) => ({
      diceValue: this.getDiceValue(r.dice),
      count: r.count
    }));

    return this.rollDice(rolls, input.id, user.id);
  }

  async rollDice(input: RollInput[], gameId: string, userId: string) {
    const results = input
      .map((r) => {
        const results: DiceResult[] = [];

        for (let index = 0; index < r.count; index++) {
          results.push({ dice: r.diceValue, result: this.getDiceResult(r.diceValue) });
        }

        return results;
      })
      .flat();

    const sum = results.reduce<number>(
      (accumulator, currentValue) => accumulator + currentValue.result,
      0
    );

    const result: RollDiceResult = { results, sum };

    const message = new RollMessage();
    message.id =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    message.result = result;
    message.timestamp = new Date().toISOString();
    message.gameUser = await this.gameUserService.findByGameAndUser({
      gameId,
      userId
    });
    await this.subscriptionService.updateChatMessages(gameId, message);

    return result;
  }

  private getDiceValue(dice: DiceType) {
    switch (dice) {
      case DiceType.D4:
        return 4;

      case DiceType.D6:
        return 6;

      case DiceType.D8:
        return 8;

      case DiceType.D10:
        return 10;

      case DiceType.D12:
        return 12;

      case DiceType.D20:
        return 20;

      case DiceType.D100:
        return 100;

      default:
        return 0;
    }
  }

  private getDiceResult(value: number) {
    return 1 + Math.floor(Math.random() * value);
  }
}
