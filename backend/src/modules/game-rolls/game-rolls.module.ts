import { Module, forwardRef } from "@nestjs/common";

import { GameUserModule } from "modules/game-user/game-user.module";
import { SubscriptionModule } from "modules/subscription/subscription.module";

import { GameRollsResolver } from "./game-rolls.resolver";
import { GameRollsService } from "./game-rolls.service";

@Module({
  imports: [forwardRef(() => SubscriptionModule), forwardRef(() => GameUserModule)],
  providers: [GameRollsResolver, GameRollsService],
  exports: [GameRollsService]
})
export class GameRollsModule {}
