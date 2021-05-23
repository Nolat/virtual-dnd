import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LinkAccountInput {
  @Field()
  userId: string;

  @Field()
  providerId: string;

  @Field()
  providerType: string;

  @Field()
  providerAccountId: string;

  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;

  @Field()
  accessTokenExpiresOn: Date;
}

@InputType()
export class UnlinkAccountInput {
  @Field()
  userId: string;

  @Field()
  providerId: string;

  @Field()
  providerAccountId: string;
}
