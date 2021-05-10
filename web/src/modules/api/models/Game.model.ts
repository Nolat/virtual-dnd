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

import { GameUser, User } from "modules/api/models";

@Entity()
@ObjectType()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => User)
  @Field()
  master: User;

  @OneToMany(() => GameUser, (gameUser) => gameUser.game)
  gameUsers: GameUser[];

  @Field(() => [User])
  users(): User[] {
    return this.gameUsers.map((gu) => gu.user);
  }

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
