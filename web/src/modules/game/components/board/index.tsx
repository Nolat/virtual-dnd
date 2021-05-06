import { Box, useColorModeValue } from "@chakra-ui/react";

export const Board: React.FC = () => {
  const bgColor = useColorModeValue("gray.200", "gray.800");

  return (
    <Box w="calc(100% - 128px)" h="100%" bg={bgColor} mt="64px" mb={0} borderTopRadius="4xl"></Box>
  );
};
