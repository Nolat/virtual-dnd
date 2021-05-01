import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { DatabaseModule } from "modules/database/database.module";
import { HelloModule } from "modules/hello/hello.module";

const ENABLE_PLAYGROUND = (process.env.ENABLE_PLAYGROUND as unknown) as boolean;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HelloModule,
    GraphQLModule.forRoot({
      path: "/",
      autoSchemaFile: true,
      introspection: ENABLE_PLAYGROUND,
      playground: ENABLE_PLAYGROUND
    })
  ]
})
export class AppModule {}
