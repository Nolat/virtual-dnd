import { Module, forwardRef } from "@nestjs/common";

import { GameModule } from "modules/game/game.module";

import { SubscriptionService } from "./subscription.service";

@Module({
  imports: [forwardRef(() => GameModule)],
  providers: [SubscriptionService],
  exports: [SubscriptionService]
})
export class SubscriptionModule {}
