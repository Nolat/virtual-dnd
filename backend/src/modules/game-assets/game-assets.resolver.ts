import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

import { CurrentUser } from "decorators/current-user.decorator";
import { AuthGuard } from "guard/auth.guard";
import { Game, User } from "models";

import { UploadedFileResponse } from "./game-assets.input";

@Resolver(() => Game)
export class GameAssetsResolver {
  @UseGuards(AuthGuard)
  @Mutation(() => Boolean, {
    name: "ImportAssets"
  })
  async importAssets(
    @CurrentUser() user: User,
    @Args("file", { type: () => GraphQLUpload }) { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    console.log({ createReadStream, filename });

    return true;
  }
}
