import React from "react";
import { FiMap } from "react-icons/fi";

import { IconButton } from "common/components/icon-button";
import { GameModalType, useGameModalStore } from "modules/game-modals/store/useGameModalStore";

export const SelectMapButton: React.FC = () => {
  const { openModal } = useGameModalStore();

  return (
    <IconButton
      icon={<FiMap />}
      aria-label="Sélectionner une map"
      tooltip="Sélectionner une map"
      tooltipPlacement="auto"
      onClick={() => openModal(GameModalType.SELECT_MAP)}
    />
  );
};
