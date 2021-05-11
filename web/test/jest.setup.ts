import "isomorphic-unfetch";

import dotenv from "dotenv";
import nock from "nock";
import { Connection, createConnection } from "typeorm";

dotenv.config({ path: ".env.test" });

let connection: Connection;

beforeAll(async (done) => {
  connection = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    cache: false,
    dropSchema: true,
    entities: ["../src/modules/api/models/**.model.ts"]
  });

  done();
});

afterAll((done) => {
  nock.cleanAll();
  nock.restore();
  connection.close();

  done();
});

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});

window.scroll = jest.fn();
window.alert = jest.fn();
