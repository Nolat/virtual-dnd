import { ThemingProps } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useEffect } from "react";

import { ModalContainer } from "common/containers";
import { InvitePlayersModal, SelectMapModal } from "modules/modals/components";
import { ModalType, useModalStore } from "modules/modals/store/useModalStore";

import { CreateGameModal } from "../create-game-modal";
import { GamePasswordModal } from "../game-password-modal";
import { SignInModalContainer } from "../sign-in-modal-container";

const SwitchModal = ({ modal }) => {
  switch (modal) {
    case ModalType.CREATE_GAME:
      return <CreateGameModal />;

    case ModalType.GAME_PASSWORD:
      return <GamePasswordModal />;

    case ModalType.INVITE_PLAYERS:
      return <InvitePlayersModal />;

    case ModalType.SELECT_MAP:
      return <SelectMapModal />;

    case ModalType.SIGN_IN: {
      return <SignInModalContainer />;
    }

    default:
      return <></>;
  }
};

export const ModalController: React.FC = () => {
  const router = useRouter();

  const { modal, closeModal } = useModalStore();

  const [size, setSize] = useState<ThemingProps<"Modal">["size"]>("6xl");

  useEffect(() => {
    switch (modal) {
      case undefined:
        break;
      case ModalType.GAME_PASSWORD:
        setSize("xs");
        break;

      case ModalType.CREATE_GAME:
      case ModalType.SIGN_IN:
        setSize("sm");
        break;

      case ModalType.INVITE_PLAYERS:
        setSize("md");
        break;

      default:
        setSize("6xl");
        break;
    }
  }, [modal]);

  const onClose = () => {
    switch (modal) {
      case ModalType.GAME_PASSWORD:
        router.replace("/");
        closeModal();
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
      closeOnOverlayClick={modal !== ModalType.GAME_PASSWORD}
    >
      <SwitchModal modal={modal} />
    </ModalContainer>
  );
};
