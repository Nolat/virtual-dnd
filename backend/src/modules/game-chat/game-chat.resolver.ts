import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";

import { CurrentUser } from "decorators/current-user.decorator";
import { AuthGuard } from "guard/auth.guard";
import { User } from "models";
import Game from "models/game.model";
import { subscriptionIterator } from "utils/pub-sub";

import { SendMessageInput } from "./game-chat.input";
import { Message } from "./game-chat.output";
import { GameChatService } from "./game-chat.service";

@Resolver(() => Game)
export class GameChatResolver {
  constructor(private readonly gameChatService: GameChatService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Message, {
    name: "SendMessage",
    nullable: true
  })
  async sendMessage(
    @Args("input") input: SendMessageInput,
    @CurrentUser() user: User
  ): Promise<Message> {
    return this.gameChatService.create(input.id, input.text, user);
  }

  @UseGuards(AuthGuard)
  @Subscription(() => Message, { name: "messageReceived", nullable: true })
  async messageReceived(@Args("id") id: string) {
    return subscriptionIterator(`messageReceived-${id}`);
  }
}
