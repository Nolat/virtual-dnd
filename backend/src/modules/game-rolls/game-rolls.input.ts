import { Field, InputType, registerEnumType } from "@nestjs/graphql";

export enum DiceType {
  D4 = "D4",
  D6 = "D6",
  D8 = "D8",
  D10 = "D10",
  D12 = "D12",
  D20 = "D20",
  D100 = "D100"
}

registerEnumType(DiceType, {
  name: "DiceType"
});

@InputType()
export class RollDiceInput {
  @Field()
  id: string;

  @Field(() => [Roll])
  rolls: Roll[];
}

@InputType()
class Roll {
  @Field(() => DiceType)
  dice: DiceType;

  @Field()
  count: number;
}
