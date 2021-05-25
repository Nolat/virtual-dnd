import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GameUserInfo {
  @Field()
  hasJoined: boolean;

  @Field()
  hasPassword: boolean;
}
