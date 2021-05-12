import "isomorphic-unfetch";

import dotenv from "dotenv";
import nock from "nock";
import { Connection } from "typeorm";

import { initializeTestDatabase } from "./setup/initializeTestDatabase";

dotenv.config({ path: ".env.test" });

let connection: Connection;

beforeAll(async (done) => {
  connection = await initializeTestDatabase();

  done();
});

beforeEach(async (done) => {
  await connection.synchronize(true);

  done();
});

afterAll((done) => {
  nock.cleanAll();
  nock.restore();

  connection?.close();

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
