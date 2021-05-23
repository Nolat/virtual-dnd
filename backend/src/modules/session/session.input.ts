import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSessionInput {
  @Field()
  userId: string;

  @Field()
  sessionMaxAge: number;
}

@InputType()
export class UpdateSessionInput {
  @Field()
  sessionId: string;

  @Field()
  sessionMaxAge: number;

  @Field()
  sessionUpdateAge: number;

  @Field({ nullable: true })
  force?: boolean;
}
