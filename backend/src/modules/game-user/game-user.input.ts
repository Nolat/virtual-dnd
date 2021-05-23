import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class JoinGameInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  password?: string;
}
