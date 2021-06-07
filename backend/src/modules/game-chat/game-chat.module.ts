import { Module, forwardRef } from "@nestjs/common";

import { GameRollsModule } from "modules/game-rolls/game-rolls.module";
import { GameUserModule } from "modules/game-user/game-user.module";
import { SubscriptionModule } from "modules/subscription/subscription.module";

import { GameChatResolver } from "./game-chat.resolver";
import { GameChatService } from "./game-chat.service";

@Module({
  imports: [
    forwardRef(() => SubscriptionModule),
    forwardRef(() => GameUserModule),
    forwardRef(() => GameRollsModule)
  ],
  providers: [GameChatResolver, GameChatService],
  exports: [GameChatService]
})
export class GameChatModule {}
