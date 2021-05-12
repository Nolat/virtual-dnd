import { Context, ContextFunction } from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { getConnection } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

import { GameResolver, UserResolver } from "../../src/modules/api/resolvers";

export const bootstrapTestServer = async ({
  context = async () => {
    return { user: undefined };
  }
}: bootstrapTestServerParams) => {
  const schema = await buildSchema({
    resolvers: [GameResolver, UserResolver],
    container: Container,
    authChecker: ({ context: { user } }) => {
      if (user) return true;
    }
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection
      })
    ],
    context: context
  });

  return server;
};

interface bootstrapTestServerParams {
  context?: Context | ContextFunction;
}
