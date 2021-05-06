import { Connection, createConnection, getConnection } from "typeorm";

import { Account, Session, User, VerificationRequest } from "modules/api/models";

let connection: Connection;

export const initializeDatabase = async () => {
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
    ssl: { rejectUnauthorized: false },
    cache: true,
    entities: [Account, Session, User, VerificationRequest]
  });

  return connection;
};
