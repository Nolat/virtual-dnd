import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { ModalContainer } from "common/containers";

import { SelectMapModal } from ".";

export default {
  title: "Game/Modals/Select map",
  component: SelectMapModal
} as Meta;

const Template: Story = () => {
  return (
    <ModalContainer isOpen={true} onClose={() => false}>
      <SelectMapModal />
    </ModalContainer>
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
