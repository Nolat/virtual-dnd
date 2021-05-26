import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "models";
import { AccountModule } from "modules/account/account.module";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AccountModule)],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
