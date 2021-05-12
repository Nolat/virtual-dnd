import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { AssetPreview } from ".";

export default {
  title: "Game/Asset preview",
  component: AssetPreview,
  argTypes: { onClick: { action: "clicked" } }
} as Meta;

const Template: Story = ({ isSelected, onClick }) => {
  return (
    <AssetPreview
      name="Sacred Spring"
      imageUrl="https://mk0a2minutetabl7hq7i.kinstacdn.com/wp-content/uploads/2021/04/Sacred-Spring-battle-map-Cropped.jpg.webp"
      badgeText="16x16"
      isSelected={isSelected}
      onClick={onClick}
    />
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

export const LightSelected: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("light");
    }, 0);
  }, [setColorMode]);

  return <Template isSelected />;
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

export const DarkSelected: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("dark");
    }, 0);
  }, [setColorMode]);

  return <Template isSelected />;
};
