import { ChakraProvider, cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

import { Container } from "components/container";
import theme from "definitions/chakra/theme";

function App({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  const { cookies } = pageProps;
  const colorModeManager =
    typeof cookies === "string" ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider resetCSS colorModeManager={colorModeManager} theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? ""
    }
  };
};

export default App;
