import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { buildSchema } from "type-graphql";

import { User } from "modules/api/models";
import { UserResolver } from "modules/api/resolvers/User.resolver";
import { initializeDatabase } from "modules/database";

let handler;

const bootstrap = async () => {
  await initializeDatabase();

  if (!handler) {
    const schema = await buildSchema({
      resolvers: [UserResolver],
      authChecker: ({ context: { user } }) => {
        if (user) return true;
      }
    });

    const server = new ApolloServer({
      schema,
      context: async ({ req }) => {
        const session = await getSession({ req });

        if (!session) return { user: undefined };

        const user = await User.findOne({
          where: { email: session.user.email, name: session.user.name }
        });

        return { user };
      }
    });

    handler = server.createHandler({
      path: "/api/graphql"
    });
  }
  return handler;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await bootstrap();
  return apolloServerHandler(req, res);
};

export const config = {
  api: {
    bodyParser: false
  }
};
