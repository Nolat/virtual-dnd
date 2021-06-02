import { Inject, Injectable, forwardRef } from "@nestjs/common";

import { RollMessage, UserMessage } from "modules/game-chat/game-chat.output";
import { GameService } from "modules/game/game.service";
import { pubSub } from "utils/pub-sub";

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService
  ) {}

  async changeOnlinePlayers(gameId: string) {
    const onlinePlayers = await this.gameService.getOnlinePlayers(gameId);
    await pubSub.publish(`onlinePlayersChanged-${gameId}`, { onlinePlayersChanged: onlinePlayers });
  }

  async updateChatMessages(gameId: string, message: UserMessage | RollMessage) {
    await pubSub.publish(`messageReceived-${gameId}`, { messageReceived: message });
  }
}
