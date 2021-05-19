import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Stack
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { Shake } from "reshake";

import { IconButton } from "common/components";
import {
  JoinGameInfoDocument,
  JoinGameInfoQuery,
  useJoinGameMutation
} from "common/definitions/graphql/generated";
import { useGameModalStore } from "modules/game-modals/store/useGameModalStore";

export const GamePasswordModal: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { closeModal } = useGameModalStore();

  const [isShown, setIsShown] = useState(false);
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const [joinGame, { loading }] = useJoinGameMutation({ errorPolicy: "all" });

  const onSubmit = async () => {
    await joinGame({
      variables: { id, password },
      update(cache, { errors }) {
        if (errors) {
          setHasError(true);

          setTimeout(() => {
            setHasError(false);
          }, 250);
        } else {
          closeModal();

          cache.writeQuery<JoinGameInfoQuery>({
            query: JoinGameInfoDocument,
            variables: { id },
            data: {
              __typename: "Query",
              JoinGameInfo: { hasJoined: true, hasPassword: true, userId: "", gameId: id }
            }
          });
        }
      }
    });
  };

  return (
    <>
      <ModalHeader>
        <Icon as={FiLock} mr={4} />
        Entrer le mot de passe
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack mb={4}>
          <InputGroup size="lg">
            <Input
              type={isShown ? "text" : "password"}
              focusBorderColor="blue.300"
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                icon={isShown ? <FiEyeOff /> : <FiEye />}
                aria-label="Afficher le mot de passe"
                onClick={() => setIsShown((prev) => !prev)}
                variant="ghost"
                _hover={{ background: "none" }}
              />
            </InputRightElement>
          </InputGroup>

          <Shake active={hasError} fixed type="hard">
            <Button
              isLoading={loading}
              onClick={onSubmit}
              width="100%"
              colorScheme={hasError ? "red" : "gray"}
            >
              Rejoindre
            </Button>
          </Shake>
        </Stack>
      </ModalBody>
    </>
  );
};
