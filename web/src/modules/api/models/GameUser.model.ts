import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

import { Game, User } from "modules/api/models";

@Entity()
@ObjectType()
export default class GameUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User, (user) => user.gameUsers, { eager: true })
  @TypeormLoader(() => Game, (gameUser: GameUser) => gameUser.userId)
  @Field(() => User)
  user: User;

  @RelationId((gameUser: GameUser) => gameUser.user)
  userId: string;

  @ManyToOne(() => Game, (game) => game.gameUsers, { eager: true })
  @TypeormLoader(() => Game, (gameUser: GameUser) => gameUser.gameId)
  @Field(() => Game)
  game: Game;

  @RelationId((gameUser: GameUser) => gameUser.game)
  gameId: string;

  @Column({ type: "timestamp", nullable: true })
  @Field({ nullable: true })
  lastSeenAt: Date;
}
