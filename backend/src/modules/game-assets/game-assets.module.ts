import { Module } from "@nestjs/common";

import { GameAssetsResolver } from "./game-assets.resolver";
import { GameAssetsService } from "./game-assets.service";

@Module({
  imports: [],
  providers: [GameAssetsResolver, GameAssetsService],
  exports: [GameAssetsService]
})
export class GameAssetsModule {}
