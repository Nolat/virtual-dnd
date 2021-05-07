import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Game from "./Game.model";
import User from "./User.model";

@Entity()
@ObjectType()
export default class GameUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User, (user) => user.games)
  @Field()
  user: User;

  @ManyToOne(() => Game, (game) => game.users)
  @Field()
  game: Game;

  @Column({ type: "timestamp" })
  @Field()
  lastSeenAt: Date;
}
