import {
  Button,
  Icon,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SliderPicker } from "react-color";
import { FiDroplet } from "react-icons/fi";
import { Shake } from "reshake";

import { useUpdateGameUserColorMutation } from "common/definitions/graphql/generated";
import { useModalStore } from "modules/modals/store/useModalStore";

export const PlayerColorPickerModal: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [updateColor, { loading }] = useUpdateGameUserColorMutation();

  const { closeModal } = useModalStore();

  const [color, setColor] = useState("#fff");
  const [hasError, setHasError] = useState(false);

  const onSubmit = async () => {
    await updateColor({
      variables: { id, color },
      update(cache, { errors }) {
        if (errors) {
          setHasError(true);

          setTimeout(() => {
            setHasError(false);
          }, 250);
        } else closeModal();
      }
    });
  };

  return (
    <>
      <ModalHeader>
        <Icon as={FiDroplet} mr={4} /> Changer de couleur
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SliderPicker
          color={color}
          onChange={(color) => setColor(color.hex)}
          onClick={(e) => console.log({ e })}
        />
      </ModalBody>
      <ModalFooter>
        <Shake active={hasError} fixed type="hard" style={{ width: "100%" }}>
          <Button
            isLoading={loading}
            onClick={onSubmit}
            width="100%"
            colorScheme={hasError ? "red" : "gray"}
          >
            Valider
          </Button>
        </Shake>
      </ModalFooter>
    </>
  );
};
