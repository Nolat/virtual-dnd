import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Game } from "modules/database/models";
import { GameUserModule } from "modules/game-user/game-user.module";

import { GameResolver } from "./game.resolver";
import { GameService } from "./game.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game]), forwardRef(() => GameUserModule)],
  providers: [GameResolver, GameService],
  exports: [GameService]
})
export class GameModule {}
