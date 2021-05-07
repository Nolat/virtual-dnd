import { Meta, Story } from "@storybook/react";
import React from "react";
import { FiGitlab } from "react-icons/fi";

import { IconButton } from ".";

export default {
  title: "Components/Icon Button",
  component: IconButton,
  argTypes: { onClick: { action: "clicked" } }
} as Meta;

export const Default: Story = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label="TEST BUTTON"
      tooltip="je suis un bouton"
      tooltipPlacement="auto"
      icon={<FiGitlab />}
    />
  );
};
