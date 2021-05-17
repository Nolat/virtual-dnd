import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { SearchInput } from ".";

export default {
  title: "Game/Search input",
  component: SearchInput,
  argTypes: { onChange: { action: "changed" } }
} as Meta;

const Template: Story = ({ onChange }) => {
  return <SearchInput placeholder="Search input" onChange={onChange} />;
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
