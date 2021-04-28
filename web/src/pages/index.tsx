import { Box, Flex, Heading } from "@chakra-ui/layout";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>Virtual D&D</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box height="100vh">
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Heading fontSize="6vw">Virtual D&D</Heading>
        </Flex>
      </Box>
    </>
  );
};

export default Index;
