import React from "react";
import { FiMap } from "react-icons/fi";

import { IconButton } from "components/icon-button";
import { ModalType, useModalStore } from "modules/game/store/useModalStore";

export const SelectMapButton: React.FC = () => {
  const { openModal } = useModalStore();

  return (
    <IconButton
      icon={<FiMap />}
      aria-label="Sélectionner une map"
      tooltip="Sélectionner une map"
      tooltipPlacement="auto"
      onClick={() => openModal(ModalType.SELECT_MAP)}
    />
  );
};
