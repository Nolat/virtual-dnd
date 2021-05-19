import {
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiCheck, FiClipboard, FiUserPlus } from "react-icons/fi";
import { useCopyToClipboard } from "react-use";

import { IconButton } from "common/components";

export const InvitePlayersModal: React.FC = () => {
  const [{ value }, copyToClipboard] = useCopyToClipboard();

  const [copied, setCopied] = useState(false);

  const onClick = () => {
    if (!copied) {
      copyToClipboard(window.location.href);

      if (value) setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <ModalHeader>
        <Icon as={FiUserPlus} mr={4} /> Inviter des joueurs
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text fontSize="sm" mb={2}>
          Les autres joueurs peuvent rejoindre grâce à ce lien
        </Text>

        <InputGroup size="sm" mb={4}>
          <Input
            type="text"
            value={window.location.href}
            focusBorderColor="blue.300"
            borderRadius="md"
          />
          <InputRightElement>
            <IconButton
              icon={copied ? <FiCheck /> : <FiClipboard />}
              aria-label="Copier le lien"
              colorScheme={copied ? "green" : "gray"}
              onClick={onClick}
              variant="ghost"
              _hover={{ background: "none" }}
            />
          </InputRightElement>
        </InputGroup>
      </ModalBody>
    </>
  );
};
