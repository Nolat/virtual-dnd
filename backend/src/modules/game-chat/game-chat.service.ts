import { Inject, Injectable, forwardRef } from "@nestjs/common";

import { RollInput } from "modules/game-rolls/game-roll.types";
import { GameRollsService } from "modules/game-rolls/game-rolls.service";
import { GameUserService } from "modules/game-user/game-user.service";
import { SubscriptionService } from "modules/subscription/subscription.service";

import { UserMessage } from "./game-chat.output";

@Injectable()
export class GameChatService {
  constructor(
    @Inject(forwardRef(() => GameUserService))
    private readonly gameUserService: GameUserService,
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService,
    @Inject(forwardRef(() => GameRollsService))
    private readonly gameRollsService: GameRollsService
  ) {}

  async processMessage(text: string, gameId: string, userId: string): Promise<UserMessage> {
    if (text.startsWith("/")) {
      this.processCommand(text, gameId, userId);
      return;
    }

    const message = await this.create(text, gameId, userId);
    return message;
  }

  async create(text: string, gameId: string, userId: string): Promise<UserMessage> {
    const message = new UserMessage();
    message.id =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    message.text = text;
    message.timestamp = new Date().toISOString();
    message.gameUser = await this.gameUserService.findByGameAndUser({ gameId, userId });

    await this.subscriptionService.updateChatMessages(gameId, message);

    return message;
  }

  async processCommand(text: string, gameId: string, userId: string) {
    const args = text.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
      case "r":
      case "roll": {
        const rolls: RollInput[] = args.map((a) => {
          const numbers = a.split(/d+/i);
          const diceValue = Number(numbers[1]);
          const count = Number(numbers[0] !== "" ? numbers[0] : 1);

          if (
            isNaN(diceValue) ||
            isNaN(count) ||
            diceValue <= 0 ||
            diceValue > 1000 ||
            count > 20 ||
            count <= 0
          )
            return;

          return { diceValue, count };
        });

        this.gameRollsService.rollDice(rolls, gameId, userId);
        break;
      }

      default:
        break;
    }
  }
}
