import { ApolloClient, HttpLink } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache";
import { useMemo } from "react";

import cache from "./cache";

const createClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
      credentials: "include"
    }),
    cache,
    connectToDevTools: true
  });
};

let client: ApolloClient<NormalizedCacheObject> | undefined;
const initializeClient = (initialState?: NormalizedCacheObject) => {
  const apolloClient = client ?? createClient();

  if (initialState) {
    const prevState = apolloClient.extract();

    apolloClient.restore({
      ...prevState,
      ...initialState,
      ...{ ROOT_QUERY: { ...prevState.ROOT_QUERY, ...initialState.ROOT_QUERY } }
    });
  }

  client = apolloClient;

  return client;
};

const useClient = (initialState?: NormalizedCacheObject) =>
  useMemo(() => initializeClient(initialState), [initialState]);
const getClient = () => initializeClient(undefined);

export { useClient, getClient };
