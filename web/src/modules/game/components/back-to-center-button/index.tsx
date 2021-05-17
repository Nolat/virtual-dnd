import { useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";
import { FiCrosshair } from "react-icons/fi";

import { IconButton } from "common/components/icon-button";
import { useStageStore } from "modules/game/store/useStageStore";

export const BackToCenterButton: React.FC = () => {
  const { resetPosition, resetScale } = useStageStore();

  const bg = useColorModeValue("white", "black");

  return (
    <IconButton
      icon={<FiCrosshair />}
      aria-label="Réinitialiser la position"
      tooltip="Réinitialiser la position"
      tooltipPlacement="auto"
      variant="solid"
      opacity={1}
      bg={bg}
      isRound
      position="absolute"
      m={4}
      right={0}
      bottom={0}
      onClick={() => {
        resetPosition();
        resetScale();
      }}
    />
  );
};
