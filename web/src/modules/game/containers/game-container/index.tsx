import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const GameContainer: React.FC = ({ children }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Flex
      w="calc(100% - 128px)"
      h="100%"
      bg={bgColor}
      mt="64px"
      mb={0}
      borderTopRadius="4xl"
      position="relative"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Flex>
  );
};
