import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Session } from "models";
import { UserModule } from "modules/user/user.module";

import { SessionResolver } from "./session.resolver";
import { SessionService } from "./session.service";

@Module({
  imports: [TypeOrmModule.forFeature([Session]), forwardRef(() => UserModule)],
  providers: [SessionResolver, SessionService],
  exports: [SessionService]
})
export class SessionModule {}
