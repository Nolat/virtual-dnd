import { Box, DarkMode, LightMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React from "react";

import { ColorModeButton } from ".";

export default {
  title: "Components/Color mode button",
  component: ColorModeButton
} as Meta;

export const Light: Story = () => {
  return (
    <LightMode>
      <Box minH="100vh" bg="white">
        <ColorModeButton />
      </Box>
    </LightMode>
  );
};

export const Dark: Story = () => {
  return (
    <DarkMode>
      <Box minH="100vh" bg="gray.800">
        <ColorModeButton />
      </Box>
    </DarkMode>
  );
};
