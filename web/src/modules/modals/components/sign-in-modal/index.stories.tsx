import { useColorMode } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react";
import React, { useEffect } from "react";

import { ModalContainer } from "common/containers";

import { SignInModal } from ".";

export default {
  title: "Authentication/Sign in modal",
  component: SignInModal
} as Meta;

const Template: Story = () => {
  const providers = {
    apple: {
      id: "apple",
      name: "Apple",
      type: "oauth",
      signinUrl: "http://localhost:3000/api/auth/signin/apple",
      callbackUrl: "http://localhost:3000/api/auth/callback/apple"
    },
    discord: {
      id: "discord",
      name: "Discord",
      type: "oauth",
      signinUrl: "http://localhost:3000/api/auth/signin/discord",
      callbackUrl: "http://localhost:3000/api/auth/callback/discord"
    },
    facebook: {
      id: "facebook",
      name: "Facebook",
      type: "oauth",
      signinUrl: "http://localhost:3000/api/auth/signin/facebook",
      callbackUrl: "http://localhost:3000/api/auth/callback/facebook"
    },
    google: {
      id: "google",
      name: "Google",
      type: "oauth",
      signinUrl: "http://localhost:3000/api/auth/signin/google",
      callbackUrl: "http://localhost:3000/api/auth/callback/google"
    },
    twitch: {
      id: "twitch",
      name: "Twitch",
      type: "oauth",
      signinUrl: "http://localhost:3000/api/auth/signin/twitch",
      callbackUrl: "http://localhost:3000/api/auth/callback/twitch"
    },
    twitter: {
      id: "twitter",
      name: "Twitter",
      type: "oauth",
      signinUrl: "http://localhost:3000/api/auth/signin/twitter",
      callbackUrl: "http://localhost:3000/api/auth/callback/twitter"
    }
  };

  return (
    <ModalContainer isOpen={true} onClose={() => false}>
      <SignInModal providers={providers as any} />
    </ModalContainer>
  );
};

export const Light: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("light");
    }, 0);
  }, [setColorMode]);

  return <Template />;
};

export const Dark: Story = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setTimeout(() => {
      setColorMode("dark");
    }, 0);
  }, [setColorMode]);

  return <Template />;
};
