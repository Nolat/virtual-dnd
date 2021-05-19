import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ClientSafeProvider, getProviders, signOut, useSession } from "next-auth/client";
import Head from "next/head";

import { SignInModal } from "modules/auth/components";

const Index: React.FC<IndexProps> = ({ providers }) => {
  const [session, loading] = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Virtual D&D</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box height="100vh">
        <Flex justifyContent="center" alignItems="center" height="100vh" flexDir="column">
          <Heading fontSize="6vw">Virtual D&D</Heading>

          {loading && <Spinner />}

          {!loading && !session && (
            <Button data-testid="sign-in-button" variant="outline" onClick={() => onOpen()}>
              Se connecter
            </Button>
          )}

          {session && (
            <Stack spacing={4} mb={4}>
              <Button data-testid="sign-out-button" onClick={() => false}>
                Créer une partie
              </Button>
              <Button data-testid="sign-out-button" variant="outline" onClick={() => signOut()}>
                Se déconnecter
              </Button>
            </Stack>
          )}
        </Flex>
      </Box>

      <SignInModal providers={providers} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const providers = await getProviders();

  return {
    props: { providers }
  };
};

interface IndexProps {
  providers: Record<string, ClientSafeProvider>;
}

export default Index;
