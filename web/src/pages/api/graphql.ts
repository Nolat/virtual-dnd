import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { Recipe } from "src/modules/api/models/Recipe.model";
import { RecipeResolver } from "src/modules/api/resolvers/Recipe.resolver";
import { buildSchema } from "type-graphql";
import { createConnection, getConnection } from "typeorm";

let handler;

const bootstrap = async () => {
  try {
    const staleConnection = getConnection();
    await staleConnection.close();
  } catch (error) {
    console.log("There was no stale connection");
  }

  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    cache: true,
    entities: [Recipe]
  });

  if (!handler) {
    const schema = await buildSchema({
      resolvers: [RecipeResolver]
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
