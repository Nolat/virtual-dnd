import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { PlayerLabel } from ".";

export default {
  title: "Game/Player label",
  component: PlayerLabel
} as Meta;

const Template: Story = () => {
  return <PlayerLabel name="Nolat" color="#9b59b6" isMe={false} />;
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
