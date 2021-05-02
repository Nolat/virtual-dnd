import { Meta, Story } from "@storybook/react";
import React from "react";

import { Topbar } from ".";

export default {
  title: "Game/Topbar",
  component: Topbar
} as Meta;

export const Default: Story = () => {
  return <Topbar bg="orange.200" />;
};
