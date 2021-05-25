import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  image: string;
}

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field()
  id: string;
}
