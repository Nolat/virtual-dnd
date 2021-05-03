import { UseQueryOptions, useQuery } from "react-query";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      body: JSON.stringify({ query, variables })
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  recipe: Recipe;
  recipes: Array<Recipe>;
};

export type QueryRecipeArgs = {
  id: Scalars["String"];
};

export type Recipe = {
  __typename?: "Recipe";
  id: Scalars["ID"];
  title: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type RecipeQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type RecipeQuery = { __typename?: "Query" } & {
  recipe: { __typename?: "Recipe" } & Pick<Recipe, "id" | "title">;
};

export const RecipeDocument = `
    query Recipe($id: String!) {
  recipe(id: $id) {
    id
    title
  }
}
    `;
export const useRecipeQuery = <TData = RecipeQuery, TError = unknown>(
  variables: RecipeQueryVariables,
  options?: UseQueryOptions<RecipeQuery, TError, TData>
) =>
  useQuery<RecipeQuery, TError, TData>(
    ["Recipe", variables],
    fetcher<RecipeQuery, RecipeQueryVariables>(RecipeDocument, variables),
    options
  );
