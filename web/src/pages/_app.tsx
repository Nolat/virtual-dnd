import { ChakraProvider, cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Provider as SessionProvider } from "next-auth/client";
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
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Container>
              <Component {...pageProps} />
            </Container>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
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
