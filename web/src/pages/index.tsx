import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { signIn, signOut, useSession } from "next-auth/client";
import Head from "next/head";
const Index = () => {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Virtual D&D</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box height="100vh">
        <Flex justifyContent="center" alignItems="center" height="100vh" flexDir="column">
          <Heading fontSize="6vw">Virtual D&D</Heading>

          {!session && (
            <Box>
              Not signed in <br />
              <Button onClick={() => signIn()}>Sign in</Button>
            </Box>
          )}
          {session && (
            <Box>
              Signed in as {session.user.email} <br />
              <Button onClick={() => signOut()}>Sign out</Button>
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Index;
