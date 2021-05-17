import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class JoinGameInfo {
  @Field()
  hasJoined: boolean;

  @Field()
  hasPassword: boolean;
}
