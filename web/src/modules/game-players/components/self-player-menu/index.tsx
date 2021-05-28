import { MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FiDroplet, FiEdit3 } from "react-icons/fi";

import { ModalType, useModalStore } from "modules/modals/store/useModalStore";

export const SelfPlayerMenu: React.FC = () => {
  const bgColor = useColorModeValue("white", "black");

  const { openModal } = useModalStore();

  return (
    <MenuList bg={bgColor}>
      <MenuItem icon={<FiEdit3 />} onClick={() => openModal(ModalType.RENAME_PLAYER)}>
        Me renommer
      </MenuItem>
      <MenuItem icon={<FiDroplet />} onClick={() => openModal(ModalType.PLAYER_COLOR_PICKER)}>
        Changer de couleur
      </MenuItem>
    </MenuList>
  );
};
