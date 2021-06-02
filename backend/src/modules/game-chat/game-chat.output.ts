import { Field, ObjectType } from "@nestjs/graphql";

import GameUser from "models/game-user.model";

@ObjectType()
export class Message {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  gameUser: GameUser;

  @Field()
  timestamp: string;
}
