import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { useEffect } from "react";
import { FiGitlab } from "react-icons/fi";

import { IconButton } from ".";

export default {
  title: "common/components/Icon Button",
  component: IconButton,
  argTypes: { onClick: { action: "clicked" } }
} as Meta;

const Template: Story = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    aria-label="TEST BUTTON"
    tooltip="je suis un bouton"
    tooltipPlacement="auto"
    icon={<FiGitlab />}
  />
);

export const Light: Story = ({ onClick }) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("light");
    }, 0);
  }, [setColorMode]);

  return <Template onClick={onClick} />;
};

export const Dark: Story = ({ onClick }) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("dark");
    }, 0);
  }, [setColorMode]);

  return <Template onClick={onClick} />;
};
