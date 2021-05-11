import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  In,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
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
  @TypeormLoader(() => GameUser, (user: User) => user.gameUserIds)
  @Field(() => [GameUser])
  gameUsers: GameUser[];

  @RelationId((game: Game) => game.gameUsers)
  gameUserIds: string[];

  @Field(() => [Game], { nullable: true })
  async games(): Promise<Game[]> {
    const gameUsers = await GameUser.find({
      where: { id: In(this.gameUserIds) }
    });

    return gameUsers.map((gu) => gu.game);
  }

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @Field()
  updatedAt: Date;
}
