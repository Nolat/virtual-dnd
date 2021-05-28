import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { ModalContainer } from "common/containers";

import { RenamePlayerModal } from ".";

export default {
  title: "Game/Modals/Rename player",
  component: RenamePlayerModal
} as Meta;

const Template: Story = () => {
  return (
    <ModalContainer isOpen={true} onClose={() => false}>
      <RenamePlayerModal />
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
