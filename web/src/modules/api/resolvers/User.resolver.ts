import { Arg, Query, Resolver } from "type-graphql";

import { User } from "../models";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], {
    name: "Users",
    nullable: true
  })
  getUsers(): Promise<User[] | undefined> {
    return User.find();
  }

  @Query(() => User, {
    name: "User",
    nullable: true
  })
  getUser(@Arg("id") id: string): Promise<User | undefined> {
    return User.findOne(id);
  }
}
