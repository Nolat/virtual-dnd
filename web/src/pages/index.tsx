import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Spinner, Stack } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import Head from "next/head";

import { ModalController } from "modules/modals/containers";
import { ModalType, useModalStore } from "modules/modals/store/useModalStore";

const Index: React.FC = () => {
  const [session, loading] = useSession();

  const { openModal } = useModalStore();

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
            <Button
              data-testid="sign-in-button"
              variant="outline"
              onClick={() => openModal(ModalType.SIGN_IN)}
            >
              Se connecter
            </Button>
          )}

          {session && (
            <Stack spacing={4} mb={4}>
              <Button
                data-testid="sign-out-button"
                onClick={() => openModal(ModalType.CREATE_GAME)}
              >
                Créer une partie
              </Button>
              <Button data-testid="sign-out-button" variant="outline" onClick={() => signOut()}>
                Se déconnecter
              </Button>
            </Stack>
          )}
        </Flex>
      </Box>

      <ModalController />
    </>
  );
};

export default Index;
