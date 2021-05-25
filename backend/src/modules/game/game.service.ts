import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

import { Game, User } from "modules/database/models";
import { GameUserService } from "modules/game-user/game-user.service";

import { CreateGameInput } from "./game.input";

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @Inject(forwardRef(() => GameUserService))
    private readonly gameUserService: GameUserService
  ) {}

  findById(id: string, options?: FindOneOptions<Game>) {
    return this.gameRepository.findOneOrFail({ where: { id }, ...options });
  }

  async create({ name, password }: CreateGameInput, user: User) {
    const game = this.gameRepository.create({ name, password, master: user });
    await game.save();

    const gameUser = this.gameUserService.create({ user, game });
    await gameUser.save();

    return this.gameRepository.findOne(game.id, { relations: ["gameUsers", "master"] });
  }
}
