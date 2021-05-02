import {
  ChakraProvider,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { StoryContext } from "@storybook/react";
import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import theme from "../src/common/definitions/chakra/theme";

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue("dark", "light");

  return (
    <Flex justify="flex-end" mb={4} position="fixed" top="1rem" right="1rem">
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        zIndex="1000"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
      />
    </Flex>
  );
};

const withChakra = (StoryFn: Function, _: StoryContext) => {
  return (
    <ChakraProvider theme={theme}>
      <div id="story-wrapper" style={{ minHeight: "100vh" }}>
        <ColorModeToggleBar />
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra];
