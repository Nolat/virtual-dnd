import { Connection, createConnection, getConnection } from "typeorm";

import { Account, Session, User, VerificationRequest } from "modules/api/models";

export let connection: Connection;

export const initializeDatabase = async () => {
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
    cache: true,
    entities: [Account, Session, User, VerificationRequest]
  });
};
