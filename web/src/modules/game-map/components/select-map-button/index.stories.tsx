import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { SelectMapButton } from ".";

export default {
  title: "Game/Icon buttons/Select map",
  component: SelectMapButton
} as Meta;

const Template: Story = () => {
  return <SelectMapButton />;
};

export const Light: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("light");
    }, 0);
  }, [setColorMode]);

  return <Template />;
};
Light.parameters = { backgrounds: { default: "light-board" } };

export const Dark: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("dark");
    }, 0);
  }, [setColorMode]);

  return <Template />;
};
Dark.parameters = { backgrounds: { default: "dark-board" } };
