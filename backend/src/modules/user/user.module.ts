import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccountModule } from "modules/account/account.module";
import { User } from "modules/database/models";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AccountModule)],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
