import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Account, Game, GameUser, Session, User } from "../../models";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: process.env.NODE_ENV !== "production",
      logging: false,
      cache: true,
      entities: [Account, Game, GameUser, Session, User],
      autoLoadEntities: true,
      keepConnectionAlive: true,
      ssl: !process.env.DATABASE_URL.includes("localhost") && { rejectUnauthorized: false }
    })
  ]
})
export class DatabaseModule {}
