import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GameUser } from "models";
import { GameModule } from "modules/game/game.module";
import { SubscriptionModule } from "modules/subscription/subscription.module";

import { GameUserResolver } from "./game-user.resolver";
import { GameUserService } from "./game-user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([GameUser]),
    forwardRef(() => GameModule),
    forwardRef(() => SubscriptionModule)
  ],
  providers: [GameUserResolver, GameUserService],
  exports: [GameUserService]
})
export class GameUserModule {}
