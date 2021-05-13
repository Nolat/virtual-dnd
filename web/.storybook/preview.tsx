import "focus-visible/dist/focus-visible";

import { ChakraProvider } from "@chakra-ui/react";
import { StoryContext } from "@storybook/react";
import * as React from "react";

import theme from "../src/common/definitions/chakra/theme";

const withChakra = (StoryFn: Function, _: StoryContext) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <div id="story-wrapper" style={{ minHeight: "100vh" }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra];
