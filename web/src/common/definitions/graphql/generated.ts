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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Game = {
  __typename?: "Game";
  id: Scalars["ID"];
  name: Scalars["String"];
  master: User;
  gameUsers: Array<GameUser>;
  users: Array<User>;
  password?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type GameUser = {
  __typename?: "GameUser";
  id: Scalars["ID"];
  user: User;
  game: Game;
  lastSeenAt?: Maybe<Scalars["DateTime"]>;
};

export type JoinGameInfo = {
  __typename?: "JoinGameInfo";
  userId: Scalars["String"];
  gameId: Scalars["String"];
  hasJoined: Scalars["Boolean"];
  hasPassword: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  CreateGame?: Maybe<Game>;
  JoinGame?: Maybe<Game>;
  LeaveGame?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateGameArgs = {
  password?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type MutationJoinGameArgs = {
  password?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
};

export type MutationLeaveGameArgs = {
  id: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  Game?: Maybe<Game>;
  JoinGameInfo?: Maybe<JoinGameInfo>;
  Users?: Maybe<Array<User>>;
  User?: Maybe<User>;
  me?: Maybe<User>;
};

export type QueryGameArgs = {
  id: Scalars["String"];
};

export type QueryJoinGameInfoArgs = {
  id: Scalars["String"];
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  image: Scalars["String"];
  gameUsers: Array<GameUser>;
  games?: Maybe<Array<Game>>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type GameFieldsFragment = { __typename?: "Game" } & Pick<Game, "id" | "name">;

export type CreateGameMutationVariables = Exact<{
  name: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
}>;

export type CreateGameMutation = { __typename?: "Mutation" } & {
  CreateGame?: Maybe<{ __typename?: "Game" } & GameFieldsFragment>;
};

export type JoinGameMutationVariables = Exact<{
  id: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
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

export type JoinGameInfoQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type JoinGameInfoQuery = { __typename?: "Query" } & {
  JoinGameInfo?: Maybe<
    { __typename?: "JoinGameInfo" } & Pick<
      JoinGameInfo,
      "userId" | "gameId" | "hasJoined" | "hasPassword"
    >
  >;
};

export const GameFieldsFragmentDoc = gql`
  fragment GameFields on Game {
    id
    name
  }
`;
export const CreateGameDocument = gql`
  mutation CreateGame($name: String!, $password: String) {
    CreateGame(name: $name, password: $password) {
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
 *      name: // value for 'name'
 *      password: // value for 'password'
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
  mutation JoinGame($id: String!, $password: String) {
    JoinGame(id: $id, password: $password) {
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
 *      id: // value for 'id'
 *      password: // value for 'password'
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
export const JoinGameInfoDocument = gql`
  query JoinGameInfo($id: String!) {
    JoinGameInfo(id: $id) {
      userId
      gameId
      hasJoined
      hasPassword
    }
  }
`;

/**
 * __useJoinGameInfoQuery__
 *
 * To run a query within a React component, call `useJoinGameInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useJoinGameInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinGameInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinGameInfoQuery(
  baseOptions: Apollo.QueryHookOptions<JoinGameInfoQuery, JoinGameInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<JoinGameInfoQuery, JoinGameInfoQueryVariables>(
    JoinGameInfoDocument,
    options
  );
}
export function useJoinGameInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<JoinGameInfoQuery, JoinGameInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<JoinGameInfoQuery, JoinGameInfoQueryVariables>(
    JoinGameInfoDocument,
    options
  );
}
export type JoinGameInfoQueryHookResult = ReturnType<typeof useJoinGameInfoQuery>;
export type JoinGameInfoLazyQueryHookResult = ReturnType<typeof useJoinGameInfoLazyQuery>;
export type JoinGameInfoQueryResult = Apollo.QueryResult<
  JoinGameInfoQuery,
  JoinGameInfoQueryVariables
>;
export type GameKeySpecifier = (
  | "id"
  | "name"
  | "master"
  | "gameUsers"
  | "users"
  | "password"
  | "createdAt"
  | "updatedAt"
  | GameKeySpecifier
)[];
export type GameFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  master?: FieldPolicy<any> | FieldReadFunction<any>;
  gameUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
  password?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GameUserKeySpecifier = ("id" | "user" | "game" | "lastSeenAt" | GameUserKeySpecifier)[];
export type GameUserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  game?: FieldPolicy<any> | FieldReadFunction<any>;
  lastSeenAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JoinGameInfoKeySpecifier = (
  | "userId"
  | "gameId"
  | "hasJoined"
  | "hasPassword"
  | JoinGameInfoKeySpecifier
)[];
export type JoinGameInfoFieldPolicy = {
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
  gameId?: FieldPolicy<any> | FieldReadFunction<any>;
  hasJoined?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPassword?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "CreateGame"
  | "JoinGame"
  | "LeaveGame"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  CreateGame?: FieldPolicy<any> | FieldReadFunction<any>;
  JoinGame?: FieldPolicy<any> | FieldReadFunction<any>;
  LeaveGame?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "Game"
  | "JoinGameInfo"
  | "Users"
  | "User"
  | "me"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  Game?: FieldPolicy<any> | FieldReadFunction<any>;
  JoinGameInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  Users?: FieldPolicy<any> | FieldReadFunction<any>;
  User?: FieldPolicy<any> | FieldReadFunction<any>;
  me?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | "id"
  | "name"
  | "email"
  | "image"
  | "gameUsers"
  | "games"
  | "createdAt"
  | "updatedAt"
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  gameUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  games?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
  Game?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | GameKeySpecifier | (() => undefined | GameKeySpecifier);
    fields?: GameFieldPolicy;
  };
  GameUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | GameUserKeySpecifier | (() => undefined | GameUserKeySpecifier);
    fields?: GameUserFieldPolicy;
  };
  JoinGameInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | JoinGameInfoKeySpecifier | (() => undefined | JoinGameInfoKeySpecifier);
    fields?: JoinGameInfoFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  User?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
};
