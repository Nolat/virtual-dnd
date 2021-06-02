import { CACHE_MANAGER, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import ColorHash from "color-hash";
import { FindOneOptions, Repository } from "typeorm";

import { Game, User } from "models";
import { GameUserService } from "modules/game-user/game-user.service";
import { SubscriptionService } from "modules/subscription/subscription.service";

import { CreateGameInput } from "./game.input";

const hash = new ColorHash();

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @Inject(forwardRef(() => GameUserService))
    private readonly gameUserService: GameUserService,
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  findById(id: string, options?: FindOneOptions<Game>) {
    return this.gameRepository.findOneOrFail({ where: { id }, ...options });
  }

  async getUsers(id: string) {
    const gameUsers = (await this.findById(id)).gameUsers;

    return Promise.all(gameUsers.map((gu) => gu.user));
  }

  async getOnlinePlayers(id: string) {
    const ids: string[] =
      (await this.cacheManager.get<string>(`ONLINE_PLAYERS-${id}`))?.split(",") || [];

    if (!ids.length) return null;

    return this.gameUserService.findByIds(ids);
  }

  async create({ name, password }: CreateGameInput, user: User) {
    let game;
    try {
      game = await this.gameRepository.create({ name, password, master: user });
      await game.save();

      const gameUser = this.gameUserService.create({
        user,
        game,
        name: user.name,
        color: hash.hex(user.name)
      });
      await gameUser.save();

      return this.gameRepository.findOne(game.id, { relations: ["gameUsers", "master"] });
    } catch (error) {
      await this.gameRepository.remove(game);

      return null;
    }
  }

  async connectUserToGame(gameId: string, userId: string) {
    const gameUser = await this.gameUserService.findByGameAndUser({ gameId, userId });

    try {
      const list =
        (await this.cacheManager.get<string>(`ONLINE_PLAYERS-${gameId}`))?.split(",") || [];
      list.push(gameUser.id);

      await this.cacheManager.set<string>(`ONLINE_PLAYERS-${gameId}`, list.toString());
    } catch (error) {
      return false;
    }

    await this.subscriptionService.changeOnlinePlayers(gameId);

    return true;
  }

  async disconnectUserFromGame(gameId: string, userId: string) {
    const gameUser = await this.gameUserService.findByGameAndUser({ gameId, userId });

    try {
      const list: string[] =
        (await this.cacheManager.get<string>(`ONLINE_PLAYERS-${gameId}`))?.split(",") || [];

      const index = list.findIndex((item) => item === gameUser.id);
      list.splice(index, 1);

      if (list.length)
        await this.cacheManager.set<string>(`ONLINE_PLAYERS-${gameId}`, list.toString());
      else this.cacheManager.del(`ONLINE_PLAYERS-${gameId}`);
    } catch (error) {
      return false;
    }

    await this.subscriptionService.changeOnlinePlayers(gameId);

    return true;
  }
}
