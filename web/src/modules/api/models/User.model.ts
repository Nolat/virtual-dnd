import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { GameUser } from ".";

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true, nullable: true })
  @Field()
  email: string;

  @Column()
  @Field()
  image: string;

  @OneToMany(() => GameUser, (gameUser) => gameUser.user)
  @Field(() => [GameUser])
  games: GameUser[];

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @Field()
  updatedAt: Date;
}
