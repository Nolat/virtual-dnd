import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { AccountModule } from "modules/account/account.module";
import { DatabaseModule } from "modules/database/database.module";
import { Session, User } from "modules/database/models";
import { GameUserModule } from "modules/game-user/game-user.module";
import { GameModule } from "modules/game/game.module";
import { SessionModule } from "modules/session/session.module";
import { UserModule } from "modules/user/user.module";
import { APIContext } from "types/APIContext";

const ENABLE_PLAYGROUND = (process.env.ENABLE_PLAYGROUND as unknown) as boolean;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AccountModule,
    GameModule,
    GameUserModule,
    SessionModule,
    UserModule,
    GraphQLModule.forRoot({
      cors: {
        origin: "http://localhost:3000",
        credentials: true
      },
      path: "/",
      autoSchemaFile: true,
      introspection: ENABLE_PLAYGROUND,
      playground: ENABLE_PLAYGROUND,
      context: async ({ req, res }: APIContext) => {
        const sessionToken = req.cookies["next-auth.session-token"];

        const session = await Session.findOne({ where: { sessionToken } });

        if (!session) return { user: undefined };

        const user = await User.findOne({
          where: { email: session.user.email, name: session.user.name }
        });

        return { req: { session: { user }, ...req }, res };
      }
    })
  ]
})
export class AppModule {}
