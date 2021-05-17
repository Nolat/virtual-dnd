import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { buildSchema } from "type-graphql";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { getConnection } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

import { initializeDatabase } from "modules/api/database";
import { User } from "modules/api/models";
import { GameResolver, UserResolver } from "modules/api/resolvers";

export const bootstrapServer = async (): Promise<ApolloServer> => {
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
    context: async ({ req }) => {
      const session = await getSession({ req });

      if (!session) return { user: undefined };

      const connection = getConnection();

      // console.log({ session });

      const user = await connection.getRepository(User).findOne({
        where: { email: session.user.email, name: session.user.name }
      });

      return { user };
    }
  });

  return server;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await initializeDatabase();

  const apolloServer = await bootstrapServer();

  const handler = apolloServer.createHandler({
    path: "/api/graphql"
  });

  return handler(req, res);
};

export const config = {
  api: {
    bodyParser: false
  }
};
