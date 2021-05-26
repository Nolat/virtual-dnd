import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from "@apollo/client/cache";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Account = {
  __typename?: "Account";
  id: Scalars["ID"];
  user: User;
  providerType: Scalars["String"];
  providerId: Scalars["String"];
  providerAccountId: Scalars["String"];
  refreshToken: Scalars["String"];
  accessToken: Scalars["String"];
  accessTokenExpiresOn: Scalars["DateTime"];
};

export type CreateGameInput = {
  name: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
};

export type CreateSessionInput = {
  userId: Scalars["String"];
  sessionMaxAge: Scalars["Float"];
};

export type CreateUserInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  image: Scalars["String"];
};

export type Game = {
  __typename?: "Game";
  id: Scalars["ID"];
  name: Scalars["String"];
  master: User;
  gameUsers: Array<GameUser>;
  password?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  users?: Maybe<Array<User>>;
  onlinePlayers?: Maybe<Array<GameUser>>;
};

export type GameUser = {
  __typename?: "GameUser";
  id: Scalars["ID"];
  name: Scalars["String"];
  color: Scalars["String"];
  user: User;
  game: Game;
  lastSeenAt?: Maybe<Scalars["DateTime"]>;
};

export type GameUserInfo = {
  __typename?: "GameUserInfo";
  hasJoined: Scalars["Boolean"];
  hasPassword: Scalars["Boolean"];
};

export type JoinGameInput = {
  id: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
};

export type LinkAccountInput = {
  userId: Scalars["String"];
  providerId: Scalars["String"];
  providerType: Scalars["String"];
  providerAccountId: Scalars["String"];
  refreshToken: Scalars["String"];
  accessToken: Scalars["String"];
  accessTokenExpiresOn: Scalars["DateTime"];
};

export type Mutation = {
  __typename?: "Mutation";
  LinkAccount?: Maybe<Account>;
  UnlinkAccount?: Maybe<Scalars["Boolean"]>;
  CreateUser?: Maybe<User>;
  UpdateUser?: Maybe<User>;
  DeleteUser?: Maybe<Scalars["Boolean"]>;
  CreateGame?: Maybe<Game>;
  JoinGame?: Maybe<Game>;
  LeaveGame?: Maybe<Scalars["Boolean"]>;
  CreateSession?: Maybe<Session>;
  UpdateSession?: Maybe<Session>;
  DeleteSession?: Maybe<Scalars["Boolean"]>;
};

export type MutationLinkAccountArgs = {
  input: LinkAccountInput;
};

export type MutationUnlinkAccountArgs = {
  input: UnlinkAccountInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["String"];
};

export type MutationCreateGameArgs = {
  input: CreateGameInput;
};

export type MutationJoinGameArgs = {
  input: JoinGameInput;
};

export type MutationLeaveGameArgs = {
  id: Scalars["String"];
};

export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};

export type MutationUpdateSessionArgs = {
  input: UpdateSessionInput;
};

export type MutationDeleteSessionArgs = {
  token: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  Users?: Maybe<Array<User>>;
  UserById?: Maybe<User>;
  UserByEmail?: Maybe<User>;
  UserByAccountId?: Maybe<User>;
  Game?: Maybe<Game>;
  GameUserInfo?: Maybe<GameUserInfo>;
  Session?: Maybe<Session>;
};

export type QueryUserByIdArgs = {
  id: Scalars["String"];
};

export type QueryUserByEmailArgs = {
  email: Scalars["String"];
};

export type QueryUserByAccountIdArgs = {
  providerId: Scalars["String"];
  id: Scalars["String"];
};

export type QueryGameArgs = {
  id: Scalars["String"];
};

export type QueryGameUserInfoArgs = {
  id: Scalars["String"];
};

export type QuerySessionArgs = {
  token: Scalars["String"];
};

export type Session = {
  __typename?: "Session";
  id: Scalars["ID"];
  user: User;
  userId: Scalars["String"];
  expiresOn: Scalars["DateTime"];
  sessionToken: Scalars["String"];
  accessToken: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  onlinePlayersChanged?: Maybe<Array<GameUser>>;
};

export type SubscriptionOnlinePlayersChangedArgs = {
  id: Scalars["String"];
};

export type UnlinkAccountInput = {
  userId: Scalars["String"];
  providerId: Scalars["String"];
  providerAccountId: Scalars["String"];
};

export type UpdateSessionInput = {
  sessionId: Scalars["String"];
  sessionMaxAge: Scalars["Float"];
  sessionUpdateAge: Scalars["Float"];
  force?: Maybe<Scalars["Boolean"]>;
};

export type UpdateUserInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  image: Scalars["String"];
  id: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  image: Scalars["String"];
  gameUsers: Array<GameUser>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  games?: Maybe<Array<Game>>;
};

export type AccountFieldsFragment = { __typename?: "Account" } & Pick<
  Account,
  | "id"
  | "providerType"
  | "providerId"
  | "providerAccountId"
  | "refreshToken"
  | "accessToken"
  | "accessTokenExpiresOn"
> & { user: { __typename?: "User" } & UserFieldsFragment };

export type LinkAccountMutationVariables = Exact<{
  input: LinkAccountInput;
}>;

export type LinkAccountMutation = { __typename?: "Mutation" } & {
  LinkAccount?: Maybe<{ __typename?: "Account" } & AccountFieldsFragment>;
};

export type UnlinkAccountMutationVariables = Exact<{
  input: UnlinkAccountInput;
}>;

export type UnlinkAccountMutation = { __typename?: "Mutation" } & Pick<Mutation, "UnlinkAccount">;

export type GameUserFieldsFragment = { __typename?: "GameUser" } & Pick<
  GameUser,
  "id" | "name" | "color"
>;

export type GameFieldsFragment = { __typename?: "Game" } & Pick<Game, "id" | "name"> & {
    master: { __typename?: "User" } & Pick<User, "id">;
  };

export type CreateGameMutationVariables = Exact<{
  input: CreateGameInput;
}>;

export type CreateGameMutation = { __typename?: "Mutation" } & {
  CreateGame?: Maybe<{ __typename?: "Game" } & GameFieldsFragment>;
};

export type JoinGameMutationVariables = Exact<{
  input: JoinGameInput;
}>;

export type JoinGameMutation = { __typename?: "Mutation" } & {
  JoinGame?: Maybe<{ __typename?: "Game" } & GameFieldsFragment>;
};

export type GameQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GameQuery = { __typename?: "Query" } & {
  Game?: Maybe<{ __typename?: "Game" } & GameFieldsFragment>;
};

export type GameUserInfoQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GameUserInfoQuery = { __typename?: "Query" } & {
  GameUserInfo?: Maybe<
    { __typename?: "GameUserInfo" } & Pick<GameUserInfo, "hasJoined" | "hasPassword">
  >;
};

export type OnlinePlayersQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type OnlinePlayersQuery = { __typename?: "Query" } & {
  Game?: Maybe<
    { __typename?: "Game" } & {
      onlinePlayers?: Maybe<Array<{ __typename?: "GameUser" } & GameUserFieldsFragment>>;
    }
  >;
};

export type OnOnlinePlayersChangedSubscriptionVariables = Exact<{
  id: Scalars["String"];
}>;

export type OnOnlinePlayersChangedSubscription = { __typename?: "Subscription" } & {
  onlinePlayersChanged?: Maybe<Array<{ __typename?: "GameUser" } & GameUserFieldsFragment>>;
};

export type SessionFieldsFragment = { __typename?: "Session" } & Pick<
  Session,
  "id" | "userId" | "expiresOn" | "sessionToken" | "accessToken"
> & { user: { __typename?: "User" } & UserFieldsFragment };

export type CreateSessionMutationVariables = Exact<{
  input: CreateSessionInput;
}>;

export type CreateSessionMutation = { __typename?: "Mutation" } & {
  CreateSession?: Maybe<{ __typename?: "Session" } & SessionFieldsFragment>;
};

export type DeleteSessionMutationVariables = Exact<{
  token: Scalars["String"];
}>;

export type DeleteSessionMutation = { __typename?: "Mutation" } & Pick<Mutation, "DeleteSession">;

export type UpdateSessionMutationVariables = Exact<{
  input: UpdateSessionInput;
}>;

export type UpdateSessionMutation = { __typename?: "Mutation" } & {
  UpdateSession?: Maybe<{ __typename?: "Session" } & SessionFieldsFragment>;
};

export type SessionQueryVariables = Exact<{
  token: Scalars["String"];
}>;

export type SessionQuery = { __typename?: "Query" } & {
  Session?: Maybe<{ __typename?: "Session" } & SessionFieldsFragment>;
};

export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "name" | "email" | "image"
>;

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = { __typename?: "Mutation" } & {
  CreateUser?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteUserMutation = { __typename?: "Mutation" } & Pick<Mutation, "DeleteUser">;

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  UpdateUser?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type UserByAccountIdQueryVariables = Exact<{
  id: Scalars["String"];
  providerId: Scalars["String"];
}>;

export type UserByAccountIdQuery = { __typename?: "Query" } & {
  UserByAccountId?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type UserByEmailQueryVariables = Exact<{
  email: Scalars["String"];
}>;

export type UserByEmailQuery = { __typename?: "Query" } & {
  UserByEmail?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type UserByIdQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type UserByIdQuery = { __typename?: "Query" } & {
  UserById?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    name
    email
    image
  }
`;
export const AccountFieldsFragmentDoc = gql`
  fragment AccountFields on Account {
    id
    user {
      ...UserFields
    }
    providerType
    providerId
    providerAccountId
    refreshToken
    accessToken
    accessTokenExpiresOn
  }
  ${UserFieldsFragmentDoc}
`;
export const GameUserFieldsFragmentDoc = gql`
  fragment GameUserFields on GameUser {
    id
    name
    color
  }
`;
export const GameFieldsFragmentDoc = gql`
  fragment GameFields on Game {
    id
    name
    master {
      id
    }
  }
`;
export const SessionFieldsFragmentDoc = gql`
  fragment SessionFields on Session {
    id
    user {
      ...UserFields
    }
    userId
    expiresOn
    sessionToken
    accessToken
  }
  ${UserFieldsFragmentDoc}
`;
export const LinkAccountDocument = gql`
  mutation LinkAccount($input: LinkAccountInput!) {
    LinkAccount(input: $input) {
      ...AccountFields
    }
  }
  ${AccountFieldsFragmentDoc}
`;
export type LinkAccountMutationFn = Apollo.MutationFunction<
  LinkAccountMutation,
  LinkAccountMutationVariables
>;

/**
 * __useLinkAccountMutation__
 *
 * To run a mutation, you first call `useLinkAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkAccountMutation, { data, loading, error }] = useLinkAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLinkAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<LinkAccountMutation, LinkAccountMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LinkAccountMutation, LinkAccountMutationVariables>(
    LinkAccountDocument,
    options
  );
}
export type LinkAccountMutationHookResult = ReturnType<typeof useLinkAccountMutation>;
export type LinkAccountMutationResult = Apollo.MutationResult<LinkAccountMutation>;
export type LinkAccountMutationOptions = Apollo.BaseMutationOptions<
  LinkAccountMutation,
  LinkAccountMutationVariables
>;
export const UnlinkAccountDocument = gql`
  mutation UnlinkAccount($input: UnlinkAccountInput!) {
    UnlinkAccount(input: $input)
  }
`;
export type UnlinkAccountMutationFn = Apollo.MutationFunction<
  UnlinkAccountMutation,
  UnlinkAccountMutationVariables
>;

/**
 * __useUnlinkAccountMutation__
 *
 * To run a mutation, you first call `useUnlinkAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkAccountMutation, { data, loading, error }] = useUnlinkAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnlinkAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<UnlinkAccountMutation, UnlinkAccountMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnlinkAccountMutation, UnlinkAccountMutationVariables>(
    UnlinkAccountDocument,
    options
  );
}
export type UnlinkAccountMutationHookResult = ReturnType<typeof useUnlinkAccountMutation>;
export type UnlinkAccountMutationResult = Apollo.MutationResult<UnlinkAccountMutation>;
export type UnlinkAccountMutationOptions = Apollo.BaseMutationOptions<
  UnlinkAccountMutation,
  UnlinkAccountMutationVariables
>;
export const CreateGameDocument = gql`
  mutation CreateGame($input: CreateGameInput!) {
    CreateGame(input: $input) {
      ...GameFields
    }
  }
  ${GameFieldsFragmentDoc}
`;
export type CreateGameMutationFn = Apollo.MutationFunction<
  CreateGameMutation,
  CreateGameMutationVariables
>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGameMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(
    CreateGameDocument,
    options
  );
}
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<
  CreateGameMutation,
  CreateGameMutationVariables
>;
export const JoinGameDocument = gql`
  mutation JoinGame($input: JoinGameInput!) {
    JoinGame(input: $input) {
      ...GameFields
    }
  }
  ${GameFieldsFragmentDoc}
`;
export type JoinGameMutationFn = Apollo.MutationFunction<
  JoinGameMutation,
  JoinGameMutationVariables
>;

/**
 * __useJoinGameMutation__
 *
 * To run a mutation, you first call `useJoinGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGameMutation, { data, loading, error }] = useJoinGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinGameMutation(
  baseOptions?: Apollo.MutationHookOptions<JoinGameMutation, JoinGameMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<JoinGameMutation, JoinGameMutationVariables>(JoinGameDocument, options);
}
export type JoinGameMutationHookResult = ReturnType<typeof useJoinGameMutation>;
export type JoinGameMutationResult = Apollo.MutationResult<JoinGameMutation>;
export type JoinGameMutationOptions = Apollo.BaseMutationOptions<
  JoinGameMutation,
  JoinGameMutationVariables
>;
export const GameDocument = gql`
  query Game($id: String!) {
    Game(id: $id) {
      ...GameFields
    }
  }
  ${GameFieldsFragmentDoc}
`;

/**
 * __useGameQuery__
 *
 * To run a query within a React component, call `useGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGameQuery(baseOptions: Apollo.QueryHookOptions<GameQuery, GameQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GameQuery, GameQueryVariables>(GameDocument, options);
}
export function useGameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GameQuery, GameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GameQuery, GameQueryVariables>(GameDocument, options);
}
export type GameQueryHookResult = ReturnType<typeof useGameQuery>;
export type GameLazyQueryHookResult = ReturnType<typeof useGameLazyQuery>;
export type GameQueryResult = Apollo.QueryResult<GameQuery, GameQueryVariables>;
export const GameUserInfoDocument = gql`
  query GameUserInfo($id: String!) {
    GameUserInfo(id: $id) {
      hasJoined
      hasPassword
    }
  }
`;

/**
 * __useGameUserInfoQuery__
 *
 * To run a query within a React component, call `useGameUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGameUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGameUserInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGameUserInfoQuery(
  baseOptions: Apollo.QueryHookOptions<GameUserInfoQuery, GameUserInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GameUserInfoQuery, GameUserInfoQueryVariables>(
    GameUserInfoDocument,
    options
  );
}
export function useGameUserInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GameUserInfoQuery, GameUserInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GameUserInfoQuery, GameUserInfoQueryVariables>(
    GameUserInfoDocument,
    options
  );
}
export type GameUserInfoQueryHookResult = ReturnType<typeof useGameUserInfoQuery>;
export type GameUserInfoLazyQueryHookResult = ReturnType<typeof useGameUserInfoLazyQuery>;
export type GameUserInfoQueryResult = Apollo.QueryResult<
  GameUserInfoQuery,
  GameUserInfoQueryVariables
>;
export const OnlinePlayersDocument = gql`
  query OnlinePlayers($id: String!) {
    Game(id: $id) {
      onlinePlayers {
        ...GameUserFields
      }
    }
  }
  ${GameUserFieldsFragmentDoc}
`;

/**
 * __useOnlinePlayersQuery__
 *
 * To run a query within a React component, call `useOnlinePlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnlinePlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnlinePlayersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOnlinePlayersQuery(
  baseOptions: Apollo.QueryHookOptions<OnlinePlayersQuery, OnlinePlayersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OnlinePlayersQuery, OnlinePlayersQueryVariables>(
    OnlinePlayersDocument,
    options
  );
}
export function useOnlinePlayersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OnlinePlayersQuery, OnlinePlayersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OnlinePlayersQuery, OnlinePlayersQueryVariables>(
    OnlinePlayersDocument,
    options
  );
}
export type OnlinePlayersQueryHookResult = ReturnType<typeof useOnlinePlayersQuery>;
export type OnlinePlayersLazyQueryHookResult = ReturnType<typeof useOnlinePlayersLazyQuery>;
export type OnlinePlayersQueryResult = Apollo.QueryResult<
  OnlinePlayersQuery,
  OnlinePlayersQueryVariables
>;
export const OnOnlinePlayersChangedDocument = gql`
  subscription OnOnlinePlayersChanged($id: String!) {
    onlinePlayersChanged(id: $id) {
      ...GameUserFields
    }
  }
  ${GameUserFieldsFragmentDoc}
`;

/**
 * __useOnOnlinePlayersChangedSubscription__
 *
 * To run a query within a React component, call `useOnOnlinePlayersChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnOnlinePlayersChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnOnlinePlayersChangedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOnOnlinePlayersChangedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    OnOnlinePlayersChangedSubscription,
    OnOnlinePlayersChangedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    OnOnlinePlayersChangedSubscription,
    OnOnlinePlayersChangedSubscriptionVariables
  >(OnOnlinePlayersChangedDocument, options);
}
export type OnOnlinePlayersChangedSubscriptionHookResult = ReturnType<
  typeof useOnOnlinePlayersChangedSubscription
>;
export type OnOnlinePlayersChangedSubscriptionResult = Apollo.SubscriptionResult<OnOnlinePlayersChangedSubscription>;
export const CreateSessionDocument = gql`
  mutation CreateSession($input: CreateSessionInput!) {
    CreateSession(input: $input) {
      ...SessionFields
    }
  }
  ${SessionFieldsFragmentDoc}
`;
export type CreateSessionMutationFn = Apollo.MutationFunction<
  CreateSessionMutation,
  CreateSessionMutationVariables
>;

/**
 * __useCreateSessionMutation__
 *
 * To run a mutation, you first call `useCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionMutation, { data, loading, error }] = useCreateSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(
    CreateSessionDocument,
    options
  );
}
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = Apollo.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = Apollo.BaseMutationOptions<
  CreateSessionMutation,
  CreateSessionMutationVariables
>;
export const DeleteSessionDocument = gql`
  mutation DeleteSession($token: String!) {
    DeleteSession(token: $token)
  }
`;
export type DeleteSessionMutationFn = Apollo.MutationFunction<
  DeleteSessionMutation,
  DeleteSessionMutationVariables
>;

/**
 * __useDeleteSessionMutation__
 *
 * To run a mutation, you first call `useDeleteSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSessionMutation, { data, loading, error }] = useDeleteSessionMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useDeleteSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteSessionMutation, DeleteSessionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteSessionMutation, DeleteSessionMutationVariables>(
    DeleteSessionDocument,
    options
  );
}
export type DeleteSessionMutationHookResult = ReturnType<typeof useDeleteSessionMutation>;
export type DeleteSessionMutationResult = Apollo.MutationResult<DeleteSessionMutation>;
export type DeleteSessionMutationOptions = Apollo.BaseMutationOptions<
  DeleteSessionMutation,
  DeleteSessionMutationVariables
>;
export const UpdateSessionDocument = gql`
  mutation UpdateSession($input: UpdateSessionInput!) {
    UpdateSession(input: $input) {
      ...SessionFields
    }
  }
  ${SessionFieldsFragmentDoc}
`;
export type UpdateSessionMutationFn = Apollo.MutationFunction<
  UpdateSessionMutation,
  UpdateSessionMutationVariables
>;

/**
 * __useUpdateSessionMutation__
 *
 * To run a mutation, you first call `useUpdateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSessionMutation, { data, loading, error }] = useUpdateSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSessionMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSessionMutation, UpdateSessionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateSessionMutation, UpdateSessionMutationVariables>(
    UpdateSessionDocument,
    options
  );
}
export type UpdateSessionMutationHookResult = ReturnType<typeof useUpdateSessionMutation>;
export type UpdateSessionMutationResult = Apollo.MutationResult<UpdateSessionMutation>;
export type UpdateSessionMutationOptions = Apollo.BaseMutationOptions<
  UpdateSessionMutation,
  UpdateSessionMutationVariables
>;
export const SessionDocument = gql`
  query Session($token: String!) {
    Session(token: $token) {
      ...SessionFields
    }
  }
  ${SessionFieldsFragmentDoc}
`;

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSessionQuery(
  baseOptions: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
}
export function useSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
}
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;
export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    CreateUser(input: $input) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options
  );
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const DeleteUserDocument = gql`
  mutation DeleteUser($id: String!) {
    DeleteUser(id: $id)
  }
`;
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserDocument,
    options
  );
}
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    UpdateUser(input: $input) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const UserByAccountIdDocument = gql`
  query UserByAccountId($id: String!, $providerId: String!) {
    UserByAccountId(id: $id, providerId: $providerId) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUserByAccountIdQuery__
 *
 * To run a query within a React component, call `useUserByAccountIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByAccountIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByAccountIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      providerId: // value for 'providerId'
 *   },
 * });
 */
export function useUserByAccountIdQuery(
  baseOptions: Apollo.QueryHookOptions<UserByAccountIdQuery, UserByAccountIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserByAccountIdQuery, UserByAccountIdQueryVariables>(
    UserByAccountIdDocument,
    options
  );
}
export function useUserByAccountIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserByAccountIdQuery, UserByAccountIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserByAccountIdQuery, UserByAccountIdQueryVariables>(
    UserByAccountIdDocument,
    options
  );
}
export type UserByAccountIdQueryHookResult = ReturnType<typeof useUserByAccountIdQuery>;
export type UserByAccountIdLazyQueryHookResult = ReturnType<typeof useUserByAccountIdLazyQuery>;
export type UserByAccountIdQueryResult = Apollo.QueryResult<
  UserByAccountIdQuery,
  UserByAccountIdQueryVariables
>;
export const UserByEmailDocument = gql`
  query UserByEmail($email: String!) {
    UserByEmail(email: $email) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUserByEmailQuery__
 *
 * To run a query within a React component, call `useUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserByEmailQuery(
  baseOptions: Apollo.QueryHookOptions<UserByEmailQuery, UserByEmailQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserByEmailQuery, UserByEmailQueryVariables>(UserByEmailDocument, options);
}
export function useUserByEmailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserByEmailQuery, UserByEmailQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserByEmailQuery, UserByEmailQueryVariables>(
    UserByEmailDocument,
    options
  );
}
export type UserByEmailQueryHookResult = ReturnType<typeof useUserByEmailQuery>;
export type UserByEmailLazyQueryHookResult = ReturnType<typeof useUserByEmailLazyQuery>;
export type UserByEmailQueryResult = Apollo.QueryResult<
  UserByEmailQuery,
  UserByEmailQueryVariables
>;
export const UserByIdDocument = gql`
  query UserById($id: String!) {
    UserById(id: $id) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
}
export function useUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
}
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export type AccountKeySpecifier = (
  | "id"
  | "user"
  | "providerType"
  | "providerId"
  | "providerAccountId"
  | "refreshToken"
  | "accessToken"
  | "accessTokenExpiresOn"
  | AccountKeySpecifier
)[];
export type AccountFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  providerType?: FieldPolicy<any> | FieldReadFunction<any>;
  providerId?: FieldPolicy<any> | FieldReadFunction<any>;
  providerAccountId?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  accessTokenExpiresOn?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GameKeySpecifier = (
  | "id"
  | "name"
  | "master"
  | "gameUsers"
  | "password"
  | "createdAt"
  | "updatedAt"
  | "users"
  | "onlinePlayers"
  | GameKeySpecifier
)[];
export type GameFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  master?: FieldPolicy<any> | FieldReadFunction<any>;
  gameUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  password?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
  onlinePlayers?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GameUserKeySpecifier = (
  | "id"
  | "name"
  | "color"
  | "user"
  | "game"
  | "lastSeenAt"
  | GameUserKeySpecifier
)[];
export type GameUserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  color?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  game?: FieldPolicy<any> | FieldReadFunction<any>;
  lastSeenAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GameUserInfoKeySpecifier = ("hasJoined" | "hasPassword" | GameUserInfoKeySpecifier)[];
export type GameUserInfoFieldPolicy = {
  hasJoined?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPassword?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "LinkAccount"
  | "UnlinkAccount"
  | "CreateUser"
  | "UpdateUser"
  | "DeleteUser"
  | "CreateGame"
  | "JoinGame"
  | "LeaveGame"
  | "CreateSession"
  | "UpdateSession"
  | "DeleteSession"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  LinkAccount?: FieldPolicy<any> | FieldReadFunction<any>;
  UnlinkAccount?: FieldPolicy<any> | FieldReadFunction<any>;
  CreateUser?: FieldPolicy<any> | FieldReadFunction<any>;
  UpdateUser?: FieldPolicy<any> | FieldReadFunction<any>;
  DeleteUser?: FieldPolicy<any> | FieldReadFunction<any>;
  CreateGame?: FieldPolicy<any> | FieldReadFunction<any>;
  JoinGame?: FieldPolicy<any> | FieldReadFunction<any>;
  LeaveGame?: FieldPolicy<any> | FieldReadFunction<any>;
  CreateSession?: FieldPolicy<any> | FieldReadFunction<any>;
  UpdateSession?: FieldPolicy<any> | FieldReadFunction<any>;
  DeleteSession?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "me"
  | "Users"
  | "UserById"
  | "UserByEmail"
  | "UserByAccountId"
  | "Game"
  | "GameUserInfo"
  | "Session"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  me?: FieldPolicy<any> | FieldReadFunction<any>;
  Users?: FieldPolicy<any> | FieldReadFunction<any>;
  UserById?: FieldPolicy<any> | FieldReadFunction<any>;
  UserByEmail?: FieldPolicy<any> | FieldReadFunction<any>;
  UserByAccountId?: FieldPolicy<any> | FieldReadFunction<any>;
  Game?: FieldPolicy<any> | FieldReadFunction<any>;
  GameUserInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  Session?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SessionKeySpecifier = (
  | "id"
  | "user"
  | "userId"
  | "expiresOn"
  | "sessionToken"
  | "accessToken"
  | SessionKeySpecifier
)[];
export type SessionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
  expiresOn?: FieldPolicy<any> | FieldReadFunction<any>;
  sessionToken?: FieldPolicy<any> | FieldReadFunction<any>;
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubscriptionKeySpecifier = ("onlinePlayersChanged" | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
  onlinePlayersChanged?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | "id"
  | "name"
  | "email"
  | "image"
  | "gameUsers"
  | "createdAt"
  | "updatedAt"
  | "games"
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  gameUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  games?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
  Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | AccountKeySpecifier | (() => undefined | AccountKeySpecifier);
    fields?: AccountFieldPolicy;
  };
  Game?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | GameKeySpecifier | (() => undefined | GameKeySpecifier);
    fields?: GameFieldPolicy;
  };
  GameUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | GameUserKeySpecifier | (() => undefined | GameUserKeySpecifier);
    fields?: GameUserFieldPolicy;
  };
  GameUserInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | GameUserInfoKeySpecifier | (() => undefined | GameUserInfoKeySpecifier);
    fields?: GameUserInfoFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  Session?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | SessionKeySpecifier | (() => undefined | SessionKeySpecifier);
    fields?: SessionFieldPolicy;
  };
  Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier);
    fields?: SubscriptionFieldPolicy;
  };
  User?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
};