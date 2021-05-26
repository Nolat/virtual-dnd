import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApolloError } from "apollo-server-express";
import ColorHash from "color-hash";
import { DeepPartial, In, Repository } from "typeorm";

import { GameUser, User } from "models";
import { GameService } from "modules/game/game.service";

import { JoinGameInput } from "./game-user.input";
import { GameUserInfo } from "./game-user.output";

const hash = new ColorHash();

@Injectable()
export class GameUserService {
  constructor(
    @InjectRepository(GameUser)
    private readonly gameUserRepository: Repository<GameUser>,
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService
  ) {}

  findByIds(ids: string[]) {
    return this.gameUserRepository.find({
      where: { id: In(ids) },
      relations: ["user"]
    });
  }

  findByGameAndUser(gameId: string, userId: string) {
    return this.gameUserRepository.findOne({
      where: { user: { id: userId }, game: { id: gameId } }
    });
  }

  async getInfo(user: User, id: string): Promise<GameUserInfo> {
    const game = await this.gameService.findById(id);

    if (!game) throw new ApolloError("Game not found", "GAME_NOT_FOUND");

    const gameUser = await this.gameUserRepository.findOne({ where: { user, game } });

    return {
      hasJoined: !!gameUser,
      hasPassword: !!game.password
    };
  }

  create(input: DeepPartial<GameUser>) {
    return this.gameUserRepository.create(input);
  }

  async join(user: User, { id, password }: JoinGameInput) {
    const game = await this.gameService.findById(id);

    if (!game) throw new ApolloError("Game not found", "GAME_NOT_FOUND");
    if (game.password && game.password !== password)
      throw new ApolloError("Wrong password", "WRONG_PASSWORD");

    let gameUser = await this.gameUserRepository.findOne({ where: { user, game } });
    if (!gameUser) {
      gameUser = this.create({
        user,
        game,
        name: user.name,
        color: hash.hex(user.name)
      });
      await gameUser.save();
    }

    return this.gameService.findById(game.id, { relations: ["gameUsers", "master"] });
  }

  async leave(user: User, id: string) {
    const game = await this.gameService.findById(id, { relations: ["master"] });
    if (!game) throw new ApolloError("Game not found", "GAME_NOT_FOUND");

    // TODO: Pour le moment, le GM ne peux pas leave ses games
    if ((await game.master).id === user.id) return false;

    const gameUser = await this.gameUserRepository.findOne({ where: { user, game } });
    if (!gameUser) return false;

    await this.gameUserRepository.remove(gameUser);
    return true;
  }
}
