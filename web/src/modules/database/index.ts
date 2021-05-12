import { Connection, createConnection, getConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

import { Account, Game, GameUser, Session, User } from "modules/api/models";

let connection: Connection;

export const initializeDatabase = async () => {
  useContainer(Container);

  if (connection) return connection;

  try {
    const staleConnection = getConnection();
    await staleConnection.close();
  } catch (_) {
    console.log("There is no stale connection to close");
  }

  connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: process.env.NODE_ENV !== "production",
    ssl: !process.env.DATABASE_URL.includes("localhost") && { rejectUnauthorized: false },
    cache: true,
    entities: [Account, Game, GameUser, Session, User]
  });

  return connection;
};
