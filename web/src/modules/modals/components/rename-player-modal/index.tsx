import {
  Button,
  Icon,
  Input,
  InputGroup,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Shake } from "reshake";

import { useUpdateGameUserNameMutation } from "common/definitions/graphql/generated";
import { useModalStore } from "modules/modals/store/useModalStore";

export const RenamePlayerModal: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [updateName, { loading }] = useUpdateGameUserNameMutation();

  const { closeModal } = useModalStore();

  const [text, setText] = useState("");
  const [hasError, setHasError] = useState(false);

  const onSubmit = async () => {
    await updateName({
      variables: { id, name: text },
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
        <Icon as={FiEdit3} mr={4} /> Me renommer
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <InputGroup size="sm" mb={4}>
          <Input
            type="text"
            focusBorderColor="blue.300"
            borderRadius="md"
            value={text}
            onChange={({ target: { value } }) => setText(value)}
          />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Shake active={hasError} fixed type="hard" style={{ width: "100%" }}>
          <Button
            isLoading={loading}
            onClick={onSubmit}
            width="100%"
            colorScheme={hasError ? "red" : "gray"}
            disabled={text === ""}
          >
            Valider
          </Button>
        </Shake>
      </ModalFooter>
    </>
  );
};
