import { Field, ObjectType, createUnionType } from "@nestjs/graphql";

import GameUser from "models/game-user.model";
import { RollDiceResult } from "modules/game-rolls/game-rolls.output";

export const MessageUnion = createUnionType({
  name: "Message",
  types: () => [UserMessage, RollMessage]
});
@ObjectType()
export class UserMessage {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  gameUser: GameUser;

  @Field()
  timestamp: string;
}

@ObjectType()
export class RollMessage {
  @Field()
  id: string;

  @Field()
  result: RollDiceResult;

  @Field()
  gameUser: GameUser;

  @Field()
  timestamp: string;
}
