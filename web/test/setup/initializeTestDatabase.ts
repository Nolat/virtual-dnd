import { createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

import { Account, Game, GameUser, Session, User } from "../../src/modules/api/models";

export const initializeTestDatabase = async () => {
  useContainer(Container);

  const connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: !process.env.DATABASE_URL.includes("localhost") && { rejectUnauthorized: false },
    synchronize: true,
    logging: false,
    cache: false,
    dropSchema: true,
    entities: [Account, Game, GameUser, Session, User]
  });

  return connection;
};
