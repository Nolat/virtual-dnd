import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DiceResult {
  @Field()
  dice: number;

  @Field()
  result: number;
}

@ObjectType()
export class RollDiceResult {
  @Field(() => [DiceResult])
  results: DiceResult[];

  @Field()
  sum: number;
}
