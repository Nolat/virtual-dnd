import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: process.env.NODE_ENV !== "production",
      logging: false,
      cache: true,
      entities: [],
      autoLoadEntities: true,
      keepConnectionAlive: true
    })
  ]
})
export class DatabaseModule {}
