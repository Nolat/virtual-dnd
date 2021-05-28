import { ApolloClient, split } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";
import { useMemo } from "react";

import cache from "./cache";

const createClient = () => {
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
    credentials: "include"
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_WS_ENDPOINT,
        options: {
          reconnect: true
        }
      })
    : null;

  const link = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" && definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    link,
    cache,
    connectToDevTools: true
  });
};

let client: ApolloClient<NormalizedCacheObject> | undefined;
const initializeClient = (initialState?: NormalizedCacheObject) => {
  if (process.browser)
    persistCache({
      cache,
      debug: true,
      storage: new LocalStorageWrapper(window.localStorage)
    });

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
