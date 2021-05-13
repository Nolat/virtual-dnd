import { gql } from "apollo-server-micro";
import { createTestClient } from "apollo-server-testing";
import { getConnection } from "typeorm";

import { Game, GameUser, User } from "modules/api/models";
import { bootstrapTestServer } from "test/setup/bootstrapServer";

describe("Game resolver", () => {
  const GAME_DATA = {
    name: "Test Game",
    password: "Test"
  };

  const USER_DATA = {
    email: "test@test.com",
    name: "test-user",
    image: "img:test"
  };

  it("should get a specific game from id", async () => {
    const connection = getConnection();
    const gameRepository = connection.getRepository(Game);
    const gameUserRepository = connection.getRepository(GameUser);
    const userRepository = connection.getRepository(User);

    const user = userRepository.create(USER_DATA);
    await user.save();

    const game = gameRepository.create({ ...GAME_DATA, master: user });
    await game.save();

    const gameUser = gameUserRepository.create({ user, game });
    await gameUser.save();

    const server = await bootstrapTestServer({});

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        query Game($id: String!) {
          Game(id: $id) {
            name
            master {
              name
            }
            users {
              name
            }
          }
        }
      `,
      variables: { id: game.id }
    });

    expect(res.data.Game).toMatchSnapshot();
  });

  it("should create a new game", async () => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);

    const user = await userRepository.create(USER_DATA);
    await user.save();

    const server = await bootstrapTestServer({
      context: async () => {
        return { user };
      }
    });

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation CreateGame($name: String!, $password: String) {
          CreateGame(name: $name, password: $password) {
            name
            master {
              name
            }
            users {
              name
            }
          }
        }
      `,
      variables: GAME_DATA
    });

    expect(res.data.CreateGame).toMatchSnapshot();
  });

  it("should prevent creating a game when user is not in context", async () => {
    const server = await bootstrapTestServer({});

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation CreateGame($name: String!, $password: String) {
          CreateGame(name: $name, password: $password) {
            name
          }
        }
      `,
      variables: GAME_DATA
    });

    expect(res.errors).toMatchSnapshot();
  });
});
