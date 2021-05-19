import React from "react";
import { FiUserPlus } from "react-icons/fi";

import { IconButton } from "common/components/icon-button";
import { ModalType, useModalStore } from "modules/modals/store/useModalStore";

export const InvitePlayersButton: React.FC = () => {
  const { openModal } = useModalStore();

  return (
    <IconButton
      icon={<FiUserPlus />}
      aria-label="Inviter des joueurs"
      tooltip="Inviter des joueurs"
      tooltipPlacement="auto"
      onClick={() => {
        openModal(ModalType.INVITE_PLAYERS);
      }}
    />
  );
};
