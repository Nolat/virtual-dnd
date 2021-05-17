import React from "react";

import { ModalContainer } from "common/containers";
import { SelectMapModal } from "modules/game-modals/components";
import { ModalType, useModalStore } from "modules/game-modals/store/useModalStore";

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
    <ModalContainer isOpen={modal != undefined} onClose={closeModal}>
      <SwitchModal modal={modal} />
    </ModalContainer>
  );
};
