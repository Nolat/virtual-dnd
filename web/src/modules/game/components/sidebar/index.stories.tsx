import { Meta, Story } from "@storybook/react";
import React from "react";

import { Sidebar } from ".";

export default {
  title: "Game/Sidebar",
  component: Sidebar
} as Meta;

export const Right: Story = () => {
  return <Sidebar bg="red.200" side="right" />;
};

export const Left: Story = () => {
  return <Sidebar bg="red.200" side="left" />;
};
