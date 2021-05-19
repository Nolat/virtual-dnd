import { Button, Icon, ModalBody, ModalCloseButton, ModalHeader, Stack } from "@chakra-ui/react";
import { Token } from "@chakra-ui/styled-system/dist/types/utils";
import * as CSS from "csstype";
import { ClientSafeProvider, signIn } from "next-auth/client";
import React from "react";
import { FaApple, FaDiscord, FaFacebook, FaGoogle, FaTwitch, FaTwitter } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

export const SignInModal: React.FC<SignInModalProps> = ({ providers }) => {
  return (
    <>
      <ModalHeader>
        <Icon as={FiLogIn} mr={4} />
        Se connecter
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack justifyContent="center" alignItems="center" spacing={4} mb={4}>
          {Object.values(providers || []).map((provider) => (
            <Button
              data-testid={`${provider.id}-button`}
              key={provider.id}
              width="85%"
              bg={brandColor(provider.name)}
              color="white"
              onClick={() => signIn(provider.id, { callbackUrl: process.env.NEXTAUTH_URL })}
            >
              <ProviderIcon name={provider.name} />
              Se connecter avec {provider.name}
            </Button>
          ))}
        </Stack>
      </ModalBody>
    </>
  );
};

const ProviderIcon = ({ name }) => {
  switch (name) {
    case "Apple":
      return <Icon as={FaApple} mr={2} />;

    case "Discord":
      return <Icon as={FaDiscord} mr={2} />;

    case "Facebook":
      return <Icon as={FaFacebook} mr={2} />;

    case "Google":
      return <Icon as={FaGoogle} mr={2} />;

    case "Twitch":
      return <Icon as={FaTwitch} mr={2} />;

    case "Twitter":
      return <Icon as={FaTwitter} mr={2} />;

    default:
      return <></>;
  }
};

function brandColor(name: string): Token<CSS.Property.Color, "colors"> {
  switch (name) {
    case "Apple":
      return "gray.900";

    case "Discord":
      return "#5865F2";

    case "Facebook":
      return "#3b5998";

    case "Google":
      return "#4285f4";

    case "Twitch":
      return "#9146ff";

    case "Twitter":
      return "#1da1f2";

    default:
      return undefined;
  }
}

export interface SignInModalProps {
  providers: Record<string, ClientSafeProvider>;
}
