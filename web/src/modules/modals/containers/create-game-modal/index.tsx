import {
  Button,
  Checkbox,
  Icon,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Stack,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Shake } from "reshake";

import { useCreateGameMutation } from "common/definitions/graphql/generated";
import { useModalStore } from "modules/modals/store/useModalStore";

export const CreateGameModal: React.FC = () => {
  const router = useRouter();

  const { closeModal } = useModalStore();

  const [name, setName] = useState<string>();
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState<string>();
  const [hasError, setHasError] = useState(false);

  const [createGame, { loading }] = useCreateGameMutation({ errorPolicy: "all" });

  const onSubmit = async () => {
    if (password === "") setPassword(undefined);

    createGame({
      variables: { name, password },
      update(_, { data, errors }) {
        if (errors) {
          setHasError(true);

          setTimeout(() => {
            setHasError(false);
          }, 250);
        } else {
          router.replace(`/game/${data.CreateGame.id}`);
          closeModal();
        }
      }
    });
  };

  return (
    <>
      <ModalHeader>
        <Icon as={FiPlus} mr={4} />
        Créer une partie
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack mb={4}>
          <Text fontSize="md" fontWeight="500">
            Nom
          </Text>
          <Input
            type="text"
            disabled={loading}
            focusBorderColor="blue.300"
            onChange={(e) => setName(e.target.value)}
          />

          <Text fontSize="md" fontWeight="500">
            Mot de passe
          </Text>
          <Input
            type="text"
            focusBorderColor="blue.300"
            disabled={!usePassword || loading}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Checkbox pb={4} isChecked={usePassword} onChange={() => setUsePassword((prev) => !prev)}>
            Utiliser un mot de passe
          </Checkbox>

          <Shake active={hasError} fixed type="hard">
            <Button
              isLoading={loading}
              disabled={(usePassword && !password) || !name}
              onClick={onSubmit}
              width="100%"
              colorScheme={hasError ? "red" : "gray"}
            >
              Commencer
            </Button>
          </Shake>
        </Stack>
      </ModalBody>
    </>
  );
};
