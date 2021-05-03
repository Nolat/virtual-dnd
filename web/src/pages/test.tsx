import Head from "next/head";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import {
  RecipeDocument,
  RecipeQuery,
  RecipeQueryVariables,
  useRecipeQuery
} from "definitions/graphql/generated";
import { fetcher } from "definitions/react-query/fetcher";

const Test = () => {
  const { data, isLoading } = useRecipeQuery({ id: "1" });

  return (
    <>
      <Head>
        <title>Test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {isLoading && <p>Loading...</p>}

      {data && <pre>{JSON.stringify(data)}</pre>}
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["Recipe", { id: "1" }],
    fetcher<RecipeQuery, RecipeQueryVariables>(RecipeDocument, { id: "1" })
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) }
  };
}

export default Test;
