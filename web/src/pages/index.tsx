import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ClientSafeProvider, getProviders, signOut, useSession } from "next-auth/client";
import Head from "next/head";

import { SignInModal } from "modules/auth/components";

const Index: React.FC<IndexProps> = ({ providers }) => {
  const [session] = useSession();

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

          {!session && <Button onClick={() => onOpen()}>Se connecter</Button>}
          {session && <Button onClick={() => signOut()}>Se déconnecter</Button>}
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
