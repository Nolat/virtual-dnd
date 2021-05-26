import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Account } from "models";

import { LinkAccountInput, UnlinkAccountInput } from "./account.input";
import { AccountService } from "./account.service";

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account, {
    name: "LinkAccount",
    nullable: true
  })
  linkAccount(@Args("input") input: LinkAccountInput) {
    return this.accountService.link(input);
  }

  @Mutation(() => Boolean, {
    name: "UnlinkAccount",
    nullable: true
  })
  unlinkAccount(@Args("input") input: UnlinkAccountInput) {
    return this.accountService.unlink(input);
  }
}
