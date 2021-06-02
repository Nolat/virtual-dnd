import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SendMessageInput {
  @Field()
  id: string;

  @Field()
  text: string;
}
