import { CacheModule, Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as store from "cache-manager-ioredis";
import * as ms from "ms";

import { Game } from "models";
import { GameUserModule } from "modules/game-user/game-user.module";

import { GameResolver } from "./game.resolver";
import { GameService } from "./game.service";

@Module({
  imports: [
    CacheModule.register({
      store,
      url: process.env.REDIS_URL,
      ttl: ms("1d")
    }),
    TypeOrmModule.forFeature([Game]),
    forwardRef(() => GameUserModule)
  ],
  providers: [GameResolver, GameService],
  exports: [GameService]
})
export class GameModule {}
