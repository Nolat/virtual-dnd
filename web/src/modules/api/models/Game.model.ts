import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import User from "./User.model";
import { GameUser } from ".";

@Entity()
@ObjectType()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User)
  @Field()
  master: User;

  @OneToMany(() => GameUser, (gameUser) => gameUser.game)
  @Field(() => [GameUser])
  users: GameUser[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @Field()
  updatedAt: Date;
}
