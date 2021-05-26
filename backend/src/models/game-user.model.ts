import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Game from "./game.model";
import User from "./user.model";

@Entity()
@ObjectType()
export default class GameUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  color: string;

  @ManyToOne(() => User, (user) => user.gameUsers)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Game, (game) => game.gameUsers)
  @Field(() => Game)
  game: Game;

  @Column({ type: "timestamp", nullable: true })
  @Field({ nullable: true })
  lastSeenAt: Date;
}
