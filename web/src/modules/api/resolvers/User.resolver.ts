import { Arg, Ctx, Query, Resolver } from "type-graphql";

import { User } from "../models";
import { APIContext } from "../types/APIContext";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], {
    name: "Users",
    nullable: true
  })
  getUsers(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, {
    name: "User",
    nullable: true
  })
  getUser(@Arg("id") id: string): Promise<User> {
    return User.findOne(id, { relations: ["games"] });
  }

  @Query(() => User, {
    name: "me",
    nullable: true
  })
  getMe(@Ctx() { user }: APIContext): User {
    return user;
  }
}
