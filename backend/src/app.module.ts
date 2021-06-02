import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import * as cookie from "cookie";

import { Session, User } from "models";
import { AccountModule } from "modules/account/account.module";
import { DatabaseModule } from "modules/database/database.module";
import { GameChatModule } from "modules/game-chat/game-chat.module";
import { GameRollsModule } from "modules/game-rolls/game-rolls.module";
import { GameUserModule } from "modules/game-user/game-user.module";
import { GameModule } from "modules/game/game.module";
import { SessionModule } from "modules/session/session.module";
import { UserModule } from "modules/user/user.module";

const ENABLE_PLAYGROUND = (process.env.ENABLE_PLAYGROUND as unknown) as boolean;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AccountModule,
    GameModule,
    GameChatModule,
    GameRollsModule,
    GameUserModule,
    SessionModule,
    UserModule,
    GraphQLModule.forRoot({
      path: "/",
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      introspection: ENABLE_PLAYGROUND,
      playground: ENABLE_PLAYGROUND,
      cors: {
        origin: "http://localhost:3000",
        credentials: true
      },
      subscriptions: {
        onConnect: async (_, webSocket: any) => {
          const cookies = cookie.parse(webSocket.upgradeReq.headers.cookie);
          return { req: { cookies, ...webSocket.upgradeReq } };
        }
      },
      context: async ({ req, res, connection }) => {
        const sessionToken = connection
          ? connection.context.req.cookies["next-auth.session-token"]
          : req.cookies["next-auth.session-token"];

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
