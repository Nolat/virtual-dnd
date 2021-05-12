import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { Sidebar } from ".";

export default {
  title: "Game/Sidebar",
  component: Sidebar
} as Meta;

export const Right: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("light");
    }, 0);
  }, [setColorMode]);

  return <Sidebar bg="gray.800" side="right" />;
};

export const Left: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("light");
    }, 0);
  }, [setColorMode]);

  return <Sidebar bg="gray.800" side="left" />;
};
