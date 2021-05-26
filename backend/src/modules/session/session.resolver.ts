import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { Session } from "models";

import { CreateSessionInput, UpdateSessionInput } from "./session.input";
import { SessionService } from "./session.service";

@Resolver(() => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Query(() => Session, { name: "Session", nullable: true })
  getSession(@Args("token") token: string) {
    return this.sessionService.findByToken(token);
  }

  @Mutation(() => Session, {
    name: "CreateSession",
    nullable: true
  })
  createSession(@Args("input") input: CreateSessionInput) {
    return this.sessionService.create(input);
  }

  @Mutation(() => Session, {
    name: "UpdateSession",
    nullable: true
  })
  updateSession(@Args("input") input: UpdateSessionInput) {
    return this.sessionService.update(input);
  }

  @Mutation(() => Boolean, {
    name: "DeleteSession",
    nullable: true
  })
  deleteSession(@Args("token") token: string) {
    return this.sessionService.delete(token);
  }
}
