import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "../models";
import { APIContext } from "../types/APIContext";

@Resolver(() => User)
export class UserResolver {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  @Query(() => [User], {
    name: "Users",
    nullable: true
  })
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Query(() => User, {
    name: "User",
    nullable: true
  })
  getUser(@Arg("id") id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  @Query(() => User, {
    name: "me",
    nullable: true
  })
  getMe(@Ctx() { user }: APIContext): User {
    return user;
  }
}
