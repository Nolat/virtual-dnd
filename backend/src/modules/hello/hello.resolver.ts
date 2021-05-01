import { Query, Resolver } from "@nestjs/graphql";

@Resolver(() => String)
export class HelloResolver {
  @Query(() => String)
  hello(): string {
    return "Hello world!";
  }
}
