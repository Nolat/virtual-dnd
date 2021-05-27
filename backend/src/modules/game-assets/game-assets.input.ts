import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UploadedFileResponse {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field()
  url: string;
}
