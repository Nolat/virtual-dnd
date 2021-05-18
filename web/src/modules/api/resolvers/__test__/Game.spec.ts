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

  const USER2_DATA = {
    email: "test2@test.com",
    name: "test2-user",
    image: "img:test2"
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

  it("should get joining game information", async () => {
    const connection = getConnection();
    const gameRepository = connection.getRepository(Game);
    const gameUserRepository = connection.getRepository(GameUser);
    const userRepository = connection.getRepository(User);

    const user = userRepository.create(USER_DATA);
    await user.save();

    const master = userRepository.create(USER2_DATA);
    await master.save();

    const game = gameRepository.create({ ...GAME_DATA, master });
    await game.save();

    const server = await bootstrapTestServer({
      context: async () => {
        return { user };
      }
    });

    const { query } = createTestClient(server);

    const JoinGameInfoQuery = gql`
      query JoinGameInfo($id: String!) {
        JoinGameInfo(id: $id) {
          hasJoined
          hasPassword
        }
      }
    `;

    const res1 = await query({
      query: JoinGameInfoQuery,
      variables: { id: game.id }
    });

    expect(res1.data.JoinGameInfo).toMatchSnapshot();

    const gameUser = gameUserRepository.create({ user, game });
    await gameUser.save();

    const res2 = await query({
      query: JoinGameInfoQuery,
      variables: { id: game.id }
    });

    expect(res2.data.JoinGameInfo).toMatchSnapshot();

    game.password = null;
    await game.save();

    const res3 = await query({
      query: JoinGameInfoQuery,
      variables: { id: game.id }
    });

    expect(res3.data.JoinGameInfo).toMatchSnapshot();
  });

  it("should add user to game (without password)", async () => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const gameRepository = connection.getRepository(Game);
    const gameUserRepository = connection.getRepository(GameUser);

    const master = userRepository.create(USER2_DATA);
    await master.save();

    const game = gameRepository.create({ ...GAME_DATA, password: null, master });
    await game.save();

    const gameUser = gameUserRepository.create({ user: master, game });
    await gameUser.save();

    const user = await userRepository.create(USER_DATA);
    await user.save();

    const server = await bootstrapTestServer({
      context: async () => {
        return { user };
      }
    });

    const { mutate } = createTestClient(server);

    const JoinGameMutation = gql`
      mutation JoinGame($id: String!) {
        JoinGame(id: $id) {
          name
          master {
            name
          }
          users {
            name
          }
        }
      }
    `;

    const res1 = await mutate({
      mutation: JoinGameMutation,
      variables: { id: game.id.replace(/.$/, "1") }
    });

    expect(res1.errors).toMatchSnapshot();

    const res2 = await mutate({
      mutation: JoinGameMutation,
      variables: { id: game.id }
    });

    expect(res2.data).toMatchSnapshot();
  });

  it("should add user to game (with password)", async () => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const gameRepository = connection.getRepository(Game);
    const gameUserRepository = connection.getRepository(GameUser);

    const master = userRepository.create(USER2_DATA);
    await master.save();

    const game = gameRepository.create({ ...GAME_DATA, master });
    await game.save();

    const gameUser = gameUserRepository.create({ user: master, game });
    await gameUser.save();

    const user = await userRepository.create(USER_DATA);
    await user.save();

    const server = await bootstrapTestServer({
      context: async () => {
        return { user };
      }
    });

    const { mutate } = createTestClient(server);

    const JoinGameMutation = gql`
      mutation JoinGame($id: String!, $password: String) {
        JoinGame(id: $id, password: $password) {
          name
          master {
            name
          }
          users {
            name
          }
        }
      }
    `;

    const res1 = await mutate({
      mutation: JoinGameMutation,
      variables: { id: game.id }
    });

    expect(res1.errors).toMatchSnapshot();

    const res2 = await mutate({
      mutation: JoinGameMutation,
      variables: { id: game.id, password: GAME_DATA.password }
    });

    expect(res2.data).toMatchSnapshot();
  });

  it("should remove user from game (as player)", async () => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const gameRepository = connection.getRepository(Game);
    const gameUserRepository = connection.getRepository(GameUser);

    const user1 = userRepository.create(USER_DATA);
    await user1.save();

    const game = gameRepository.create({ ...GAME_DATA, master: user1 });
    await game.save();

    const gameUser1 = gameUserRepository.create({ user: user1, game });
    await gameUser1.save();

    const user2 = await userRepository.create(USER2_DATA);
    await user2.save();

    const gameUser2 = gameUserRepository.create({ user: user2, game });
    await gameUser2.save();

    const server = await bootstrapTestServer({
      context: async () => {
        return { user: user2 };
      }
    });

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation LeaveGame($id: String!) {
          LeaveGame(id: $id)
        }
      `,
      variables: { id: game.id }
    });

    expect(res.data.LeaveGame).toStrictEqual(true);
  });

  it("should prevent user (gm) from leaving game", async () => {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    const gameRepository = connection.getRepository(Game);
    const gameUserRepository = connection.getRepository(GameUser);

    const user = userRepository.create(USER_DATA);
    await user.save();

    const game = gameRepository.create({ ...GAME_DATA, master: user });
    await game.save();

    const gameUser = gameUserRepository.create({ user, game });
    await gameUser.save();

    const server = await bootstrapTestServer({
      context: async () => {
        return { user };
      }
    });

    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation LeaveGame($id: String!) {
          LeaveGame(id: $id)
        }
      `,
      variables: { id: game.id }
    });

    expect(res.data.LeaveGame).toStrictEqual(false);
  });
});
