import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache";
import { GetServerSidePropsContext } from "next";
import { useMemo } from "react";

import cache from "./cache";

const createClient = (ctx?: GetServerSidePropsContext) => {
  const setCookiesAfterware = new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
      ctx?.res.setHeader(
        "set-cookie",
        operation.getContext().response.headers.raw()["set-cookie"] || ""
      );
      return response;
    })
  );

  return new ApolloClient({
    link: setCookiesAfterware.concat(
      new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
        headers: { cookie: ctx?.req.headers.cookie }
      })
    ),
    cache,
    connectToDevTools: true
  });
};

let client: ApolloClient<NormalizedCacheObject> | undefined;
const initializeClient = (
  initialState?: NormalizedCacheObject,
  ctx?: GetServerSidePropsContext
) => {
  const apolloClient = client ?? createClient(ctx);

  if (initialState) {
    const prevState = apolloClient.extract();

    apolloClient.restore({
      ...prevState,
      ...initialState,
      ...{ ROOT_QUERY: { ...prevState.ROOT_QUERY, ...initialState.ROOT_QUERY } }
    });
  }

  if (typeof window === "undefined") return apolloClient;

  client ??= apolloClient;

  return client;
};

const useClient = (initialState?: NormalizedCacheObject) =>
  useMemo(() => initializeClient(initialState), [initialState]);
const getClient = (ctx: GetServerSidePropsContext) => initializeClient(undefined, ctx);

export { useClient, getClient };
