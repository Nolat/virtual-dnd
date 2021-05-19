import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class JoinGameInfo {
  @Field()
  userId: string;

  @Field()
  gameId: string;

  @Field()
  hasJoined: boolean;

  @Field()
  hasPassword: boolean;
}
