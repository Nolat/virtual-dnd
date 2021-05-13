import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  In,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
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
  @TypeormLoader(() => User, (game: Game) => game.masterId)
  @Field(() => User)
  master: User;

  @RelationId((game: Game) => game.master)
  masterId: string;

  @OneToMany(() => GameUser, (gameUser) => gameUser.game)
  @TypeormLoader(() => GameUser, (game: Game) => game.gameUserIds)
  @Field(() => [GameUser])
  gameUsers: GameUser[];

  @RelationId((game: Game) => game.gameUsers)
  gameUserIds: string[];

  @Field(() => [User])
  async users(): Promise<User[]> {
    const gameUsers = await GameUser.find({
      where: { id: In(this.gameUserIds) }
    });

    return gameUsers.map((gu) => gu.user);
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
