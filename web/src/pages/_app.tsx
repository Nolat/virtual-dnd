import { ChakraProvider, cookieStorageManager, localStorageManager } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { AppProps } from "next/app";

import { Container } from "components/container";
import theme from "definitions/chakra/theme";

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { cookies } = pageProps;
  const colorModeManager =
    typeof cookies === "string" ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider resetCSS colorModeManager={colorModeManager} theme={theme}>
      <Container>
        <Component {...pageProps} />
      </Container>
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
