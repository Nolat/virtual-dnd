import { Field, ID, ObjectType } from "@nestjs/graphql";
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

import GameUser from "./game-user.model";
import User from "./user.model";

@Entity()
@ObjectType()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => User, { lazy: true })
  @Field(() => User)
  master: User;

  @OneToMany(() => GameUser, (gameUser) => gameUser.game, { eager: true })
  @Field(() => [GameUser])
  gameUsers: GameUser[];

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
