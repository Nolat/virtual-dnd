import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "decorators/current-user.decorator";
import { Game, User } from "models";

import { CreateUserInput, UpdateUserInput } from "./user.input";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: "me", nullable: true })
  async getMe(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => [User], {
    name: "Users",
    nullable: true
  })
  getUsers() {
    return this.userService.findAll();
  }

  @Query(() => User, {
    name: "UserById",
    nullable: true
  })
  getUserById(@Args("id") id: string) {
    return this.userService.findById(id);
  }

  @Query(() => User, {
    name: "UserByEmail",
    nullable: true
  })
  getUserByEmail(@Args("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @Query(() => User, {
    name: "UserByAccountId",
    nullable: true
  })
  getUserByAccountId(@Args("id") id: string, @Args("providerId") providerId: string) {
    return this.userService.findByAccountId(id, providerId);
  }

  @Mutation(() => User, {
    name: "CreateUser",
    nullable: true
  })
  createUser(@Args("input") input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User, {
    name: "UpdateUser",
    nullable: true
  })
  updateUser(@Args("input") input: UpdateUserInput) {
    return this.userService.update(input);
  }

  @Mutation(() => Boolean, {
    name: "DeleteUser",
    nullable: true
  })
  deleteUser(@Args("id") id: string) {
    return this.userService.delete(id);
  }

  @ResolveField(() => [Game], { name: "games", nullable: true })
  async getGames(@Parent() user: User): Promise<Game[]> {
    return this.userService.getGames(user.id);
  }
}
