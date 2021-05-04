import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "type-graphql";

import { connection, initializeDatabase } from "modules/database";

let handler;

const bootstrap = async () => {
  if (!connection) initializeDatabase();

  if (!handler) {
    const schema = await buildSchema({
      resolvers: [null]
    });

    const server = new ApolloServer({ schema });

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
