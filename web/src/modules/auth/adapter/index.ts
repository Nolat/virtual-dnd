import { AppOptions } from "next-auth/internals";

import { getClient } from "common/definitions/apollo/client";
import {
  CreateSessionDocument,
  CreateSessionMutation,
  CreateSessionMutationVariables,
  CreateUserDocument,
  CreateUserMutation,
  CreateUserMutationVariables,
  DeleteSessionDocument,
  DeleteSessionMutation,
  DeleteSessionMutationVariables,
  DeleteUserDocument,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  LinkAccountDocument,
  LinkAccountMutation,
  LinkAccountMutationVariables,
  SessionDocument,
  SessionQuery,
  SessionQueryVariables,
  UnlinkAccountDocument,
  UnlinkAccountMutation,
  UnlinkAccountMutationVariables,
  UpdateSessionDocument,
  UpdateSessionMutation,
  UpdateSessionMutationVariables,
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UserByAccountIdDocument,
  UserByAccountIdQuery,
  UserByAccountIdQueryVariables,
  UserByEmailDocument,
  UserByEmailQuery,
  UserByEmailQueryVariables,
  UserByIdDocument,
  UserByIdQuery,
  UserByIdQueryVariables
} from "common/definitions/graphql/generated";

export const AuthAdapter = () => {
  return {
    getAdapter: async ({ session: { maxAge, updateAge } }: AppOptions) => {
      const sessionMaxAge = maxAge * 1000;
      const sessionUpdateAge = updateAge * 1000;

      return {
        async createUser(profile) {
          const client = getClient();

          const { data } = await client.mutate<CreateUserMutation, CreateUserMutationVariables>({
            mutation: CreateUserDocument,
            variables: { input: profile }
          });

          return data.CreateUser;
        },
        async getUser(id) {
          const client = getClient();

          const { data } = await client.query<UserByIdQuery, UserByIdQueryVariables>({
            query: UserByIdDocument,
            variables: { id }
          });

          return data.UserById;
        },
        async getUserByEmail(email) {
          const client = getClient();

          const { data } = await client.query<UserByEmailQuery, UserByEmailQueryVariables>({
            query: UserByEmailDocument,
            variables: { email }
          });

          return data.UserByEmail;
        },
        async getUserByProviderAccountId(providerId, providerAccountId) {
          const client = getClient();

          const { data } = await client.query<UserByAccountIdQuery, UserByAccountIdQueryVariables>({
            query: UserByAccountIdDocument,
            variables: { providerId, id: providerAccountId }
          });

          return data.UserByAccountId;
        },
        async updateUser(user) {
          const client = getClient();

          const { data } = await client.mutate<UpdateUserMutation, UpdateUserMutationVariables>({
            mutation: UpdateUserDocument,
            variables: { input: user }
          });

          return data.UpdateUser;
        },
        async deleteUser(userId) {
          const client = getClient();

          const { data } = await client.mutate<DeleteUserMutation, DeleteUserMutationVariables>({
            mutation: DeleteUserDocument,
            variables: { id: userId }
          });

          return data.DeleteUser;
        },
        async linkAccount(
          userId,
          providerId,
          providerType,
          providerAccountId,
          refreshToken,
          accessToken,
          accessTokenExpiresOn
        ) {
          const client = getClient();

          const { data } = await client.mutate<LinkAccountMutation, LinkAccountMutationVariables>({
            mutation: LinkAccountDocument,
            variables: {
              input: {
                userId,
                providerId,
                providerType,
                providerAccountId,
                refreshToken,
                accessToken,
                accessTokenExpiresOn
              }
            }
          });

          return data.LinkAccount;
        },
        async unlinkAccount(userId, providerId, providerAccountId) {
          const client = getClient();

          const { data } = await client.mutate<
            UnlinkAccountMutation,
            UnlinkAccountMutationVariables
          >({
            mutation: UnlinkAccountDocument,
            variables: { input: { userId, providerId, providerAccountId } }
          });

          return data.UnlinkAccount;
        },
        async createSession(user) {
          const client = getClient();

          const { data } = await client.mutate<
            CreateSessionMutation,
            CreateSessionMutationVariables
          >({
            mutation: CreateSessionDocument,
            variables: { input: { userId: user.id, sessionMaxAge } }
          });

          return data.CreateSession;
        },
        async getSession(sessionToken) {
          const client = getClient();

          const { data } = await client.query<SessionQuery, SessionQueryVariables>({
            query: SessionDocument,
            variables: { token: sessionToken }
          });

          return data.Session;
        },
        async updateSession(session, force) {
          const client = getClient();

          const { data } = await client.mutate<
            UpdateSessionMutation,
            UpdateSessionMutationVariables
          >({
            mutation: UpdateSessionDocument,
            variables: { input: { sessionId: session.id, sessionMaxAge, sessionUpdateAge, force } }
          });

          return data.UpdateSession;
        },
        async deleteSession(sessionToken) {
          const client = getClient();

          const { data } = await client.mutate<
            DeleteSessionMutation,
            DeleteSessionMutationVariables
          >({
            mutation: DeleteSessionDocument,
            variables: { token: sessionToken }
          });

          return data.__typename;
        }
      };
    }
  };
};
