import { Box, Center, Divider, Flex, Text } from "@chakra-ui/layout";
import Head from "next/head";

const Page404: React.FC = () => {
  return (
    <>
      <Head>
        <title>404: This page could not be found.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box height="100vh">
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Center height="50px">
            <Text fontSize="3xl">404</Text>
            <Divider orientation="vertical" mr={4} ml={4} borderWidth={1} />
            <Text fontSize="lg">This page could not be found.</Text>
          </Center>
        </Flex>
      </Box>
    </>
  );
};

export default Page404;
