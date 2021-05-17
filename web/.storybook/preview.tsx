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

export const parameters = {
  backgrounds: {
    values: [
      {
        name: "light-bg",
        value: "#ffffff"
      },
      {
        name: "light-board",
        value: "#F1F2F3"
      },
      {
        name: "dark-bg",
        value: "#060607"
      },
      {
        name: "dark-board",
        value: "#202225"
      }
    ]
  }
};

export const decorators = [withChakra];
