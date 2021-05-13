import { gql } from "apollo-server-micro";
import { createTestClient } from "apollo-server-testing";
import { getConnection } from "typeorm";

import { User } from "modules/api/models";
import { bootstrapTestServer } from "test/setup/bootstrapServer";

describe("User resolver", () => {
  const USER1_DATA = { email: "test1@test.com", name: "test1-user", image: "img:test1" };
  const USER2_DATA = { email: "test2@test.com", name: "test2-user", image: "img:test2" };

  const users: User[] = [];

  beforeAll(async () => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);

    const user1 = await userRepository.create(USER1_DATA);
    await user1.save();

    const user2 = await userRepository.create(USER2_DATA);
    await user2.save();

    users.push(user1, user2);
  });

  afterAll(async () => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);

    userRepository.remove(users);
  });

  it("should get a list of users", async () => {
    const server = await bootstrapTestServer({});

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        query Users {
          Users {
            name
            email
            image
          }
        }
      `
    });

    expect(res.data.Users).toMatchSnapshot();
  });

  it("should get a specific user from id", async () => {
    const server = await bootstrapTestServer({});

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        query User($id: String!) {
          User(id: $id) {
            name
            email
            image
          }
        }
      `,
      variables: { id: users[0].id }
    });

    expect(res.data.User).toMatchSnapshot();
  });

  it("should get a user when passed from context", async () => {
    const user = users[1];

    const server = await bootstrapTestServer({
      context: async () => {
        return { user };
      }
    });

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        query me {
          me {
            name
            email
            image
          }
        }
      `
    });

    expect(res.data.me).toMatchSnapshot();
  });
});
