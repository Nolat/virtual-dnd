import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Game, User } from "modules/api/models";

@Entity()
@ObjectType()
export default class GameUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User, (user) => user.games)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Game, (game) => game.users)
  @Field()
  game: Game;

  @Column({ type: "timestamp", nullable: true })
  @Field({ nullable: true })
  lastSeenAt: Date;
}
