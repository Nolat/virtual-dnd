import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Account } from "models";
import { UserModule } from "modules/user/user.module";

import { AccountResolver } from "./account.resolver";
import { AccountService } from "./account.service";

@Module({
  imports: [TypeOrmModule.forFeature([Account]), forwardRef(() => UserModule)],
  providers: [AccountResolver, AccountService],
  exports: [AccountService]
})
export class AccountModule {}
