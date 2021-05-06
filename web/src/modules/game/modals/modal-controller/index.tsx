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

export const ModalController: React.FC = () => {
  const { modal, closeModal } = useModalStore();

  return (
    <Modal isOpen={modal != undefined} onClose={closeModal} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <SwitchModal modal={modal} />
      </ModalContent>
    </Modal>
  );
};
