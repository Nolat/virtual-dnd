import "focus-visible/dist/focus-visible";

import { ApolloProvider } from "@apollo/client";
import {
  ChakraProvider,
  Flex,
  cookieStorageManager,
  localStorageManager,
  useColorModeValue
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Provider as SessionProvider } from "next-auth/client";
import { AppProps } from "next/app";

import { useClient } from "common/definitions/apollo/client";
import theme from "common/definitions/chakra/theme";

function App({ Component, pageProps }: AppProps): JSX.Element {
  const { cookies } = pageProps;
  const colorModeManager =
    typeof cookies === "string" ? cookieStorageManager(cookies) : localStorageManager;

  const client = useClient();

  return (
    <ChakraProvider resetCSS colorModeManager={colorModeManager} theme={theme}>
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={client}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ApolloProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

const Container: React.FC = ({ children }) => {
  const bgColor = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor}
      color={color}
      height="100vh"
    >
      {children}
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? ""
    }
  };
};

export default App;
