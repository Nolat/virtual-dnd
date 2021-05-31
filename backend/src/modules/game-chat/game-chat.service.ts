import { Inject, Injectable, forwardRef } from "@nestjs/common";

import User from "models/user.model";
import { GameUserService } from "modules/game-user/game-user.service";
import { SubscriptionService } from "modules/subscription/subscription.service";

import { Message } from "./game-chat.output";

@Injectable()
export class GameChatService {
  constructor(
    @Inject(forwardRef(() => GameUserService))
    private readonly gameUserService: GameUserService,
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService
  ) {}

  async create(gameId: string, text: string, user: User): Promise<Message> {
    const message = new Message();
    message.id =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    message.text = text;
    message.timestamp = new Date().toISOString();
    message.gameUser = await this.gameUserService.findByGameAndUser({ gameId, userId: user.id });

    await this.subscriptionService.updateChatMessages(gameId, message);

    return message;
  }
}
