import { useColorModeValue } from "@chakra-ui/color-mode";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import React from "react";

import { ModalType, useModalStore } from "modules/game/store/useModalStore";

import { SelectMapModal } from "../select-map-modal";

const SwitchModal = ({ modal }) => {
  switch (modal) {
    case ModalType.SELECT_MAP:
      return <SelectMapModal />;

    default:
      return <></>;
  }
};

export const ModalContainer = ({ modal, closeModal }) => {
  const bgColor = useColorModeValue("white", "black");
  const overlayColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  return (
    <Modal isOpen={modal != undefined} onClose={closeModal} size="6xl">
      <ModalOverlay bg={overlayColor} />
      <ModalContent bg={bgColor}>
        <SwitchModal modal={modal} />
      </ModalContent>
    </Modal>
  );
};

export const ModalController: React.FC = () => {
  const { modal, closeModal } = useModalStore();

  return <ModalContainer modal={modal} closeModal={closeModal} />;
};
