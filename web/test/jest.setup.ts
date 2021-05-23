import "isomorphic-unfetch";

import dotenv from "dotenv";
import nock from "nock";

dotenv.config({ path: ".env.test" });

beforeAll(async (done) => {
  done();
});

beforeEach(async (done) => {
  done();
});

afterAll((done) => {
  nock.cleanAll();
  nock.restore();

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
