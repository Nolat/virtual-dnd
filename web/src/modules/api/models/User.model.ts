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

import { Game, GameUser } from "modules/api/models";

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
  gameUsers: GameUser[];

  @Field(() => [Game], { nullable: true })
  games(): Game[] {
    return this.gameUsers.map((gu) => gu.game);
  }

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @Field()
  updatedAt: Date;
}
