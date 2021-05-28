import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

import { CurrentUser } from "decorators/current-user.decorator";
import { AuthGuard } from "guard/auth.guard";
import { Game, User } from "models";

import { GameAssetsService } from "./game-assets.service";

@Resolver(() => Game)
export class GameAssetsResolver {
  constructor(private readonly gameAssetsService: GameAssetsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, {
    name: "ImportAssets"
  })
  async importAssets(
    @CurrentUser() user: User,
    @Args("file", { type: () => GraphQLUpload }) file: FileUpload
  ): Promise<boolean> {
    return this.gameAssetsService.uploadAssets(file);
  }
}
