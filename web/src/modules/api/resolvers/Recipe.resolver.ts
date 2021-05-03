import { Arg, Query, Resolver } from "type-graphql";

import { Recipe } from "../models/Recipe.model";

@Resolver(Recipe)
export class RecipeResolver {
  @Query(() => Recipe)
  recipe(@Arg("id") id: string) {
    return Recipe.findOne(id);
  }

  @Query(() => [Recipe])
  recipes() {
    return Recipe.find();
  }
}
