import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

import { User } from "models";
import { AccountService } from "modules/account/account.service";

import { CreateUserInput, UpdateUserInput } from "./user.input";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findById(id: string, options?: FindOneOptions<User>) {
    return this.userRepository.findOneOrFail({ where: { id }, ...options });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneOrFail({ where: { email } });
  }

  async findByAccountId(id: string, providerId: string) {
    const account = await this.accountService.findById(id, providerId);

    return this.userRepository.findOneOrFail({ where: { id: account.user.id } });
  }

  async getGames(id: string) {
    const gameUsers = (await this.findById(id)).gameUsers;

    return Promise.all(gameUsers.map((gu) => gu.game));
  }

  create(input: CreateUserInput) {
    const user = new User();
    user.name = input.name;
    user.email = input.email;
    user.image = input.image;

    return this.userRepository.save(user);
  }

  async update(input: UpdateUserInput) {
    const user = await this.findById(input.id);

    user.name = input.name;
    user.email = input.email;
    user.image = input.image;

    return this.userRepository.save(user);
  }

  async delete(id: string) {
    await this.userRepository.delete({ id });

    return true;
  }
}
