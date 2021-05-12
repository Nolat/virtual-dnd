import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { Topbar } from ".";

export default {
  title: "Game/Topbar",
  component: Topbar
} as Meta;

export const Default: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("light");
    }, 0);
  }, [setColorMode]);

  return <Topbar bg="gray.800" />;
};
