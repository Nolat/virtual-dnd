import { Button } from "@chakra-ui/button";
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from "@chakra-ui/modal";
import React from "react";
import { FiTrash } from "react-icons/fi";

import { IconButton } from "components/icon-button";

export const SelectMapModal: React.FC = () => {
  return (
    <>
      <ModalHeader>Sélectionner or importer une map</ModalHeader>
      <ModalCloseButton />
      <ModalBody></ModalBody>

      <ModalFooter>
        <Button width="100%">Sélectionner</Button>
        <IconButton
          icon={<FiTrash size={20} />}
          aria-label={`Déselectionner la map actuelle`}
          tooltip={`Déselectionner la map actuelle`}
          tooltipPlacement="auto"
          onClick={() => false}
          variant="solid"
          ml={2}
        />
      </ModalFooter>
    </>
  );
};
