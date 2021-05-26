import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Account } from "models";
import { UserService } from "modules/user/user.service";

import { LinkAccountInput, UnlinkAccountInput } from "./account.input";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  findById(id: string, providerId: string) {
    return this.accountRepository.findOneOrFail({ where: { providerAccountId: id, providerId } });
  }

  async link({
    accessToken,
    accessTokenExpiresOn,
    providerAccountId,
    providerId,
    providerType,
    refreshToken,
    userId
  }: LinkAccountInput) {
    const account = new Account();
    account.user = await this.userService.findById(userId);
    account.providerId = providerId;
    account.providerType = providerType;
    account.providerAccountId = providerAccountId;
    account.refreshToken = refreshToken;
    account.accessToken = accessToken;
    account.accessTokenExpiresOn = accessTokenExpiresOn;

    return this.accountRepository.save(account);
  }

  async unlink({ providerAccountId, providerId, userId }: UnlinkAccountInput) {
    const user = await this.userService.findById(userId);
    this.accountRepository.delete({ user, providerId, providerAccountId });

    return true;
  }
}
