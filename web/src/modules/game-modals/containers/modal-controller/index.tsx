import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useEffect } from "react";

import { ModalContainer } from "common/containers";
import { SelectMapModal } from "modules/game-modals/components";
import { GameModalType, useGameModalStore } from "modules/game-modals/store/useGameModalStore";

import { GamePasswordModal } from "../game-password-modal";

const SwitchModal = ({ modal }) => {
  switch (modal) {
    case GameModalType.SELECT_MAP:
      return <SelectMapModal />;

    case GameModalType.GAME_PASSWORD:
      return <GamePasswordModal />;

    default:
      return <></>;
  }
};

export const ModalController: React.FC = () => {
  const router = useRouter();

  const { modal, closeModal } = useGameModalStore();

  const [size, setSize] = useState("6xl");

  useEffect(() => {
    switch (modal) {
      case undefined:
        break;

      case GameModalType.GAME_PASSWORD:
        setSize("xs");
        break;

      default:
        setSize("6xl");
        break;
    }
  }, [modal]);

  const onClose = () => {
    switch (modal) {
      case GameModalType.GAME_PASSWORD:
        router.replace("/");
        break;

      default:
        closeModal();
        break;
    }
  };

  return (
    <ModalContainer
      isOpen={modal != undefined}
      onClose={onClose}
      size={size}
      closeOnOverlayClick={modal !== GameModalType.GAME_PASSWORD}
    >
      <SwitchModal modal={modal} />
    </ModalContainer>
  );
};
