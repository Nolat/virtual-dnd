import { Menu, useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { SelfPlayerMenu } from ".";

export default {
  title: "Game/Self player menu",
  component: SelfPlayerMenu
} as Meta;

const Template: Story = () => {
  return (
    <Menu isOpen={true}>
      <SelfPlayerMenu />
    </Menu>
  );
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

export const Dark: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("dark");
    }, 0);
  }, [setColorMode]);

  return <Template />;
};
