import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useState } from "react";
import { FiSend } from "react-icons/fi";

import {
  GetMessagesDocument,
  GetMessagesQuery,
  useGameUserQuery,
  useSendMessageMutation
} from "common/definitions/graphql/generated";

export const SendMessageInput: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: gameUserData } = useGameUserQuery({ variables: { id } });

  const [sendMessage] = useSendMessageMutation();

  const [text, setText] = useState("");
  const [hasError, setHasError] = useState(false);

  const onSubmit = async () => {
    if (text === "") return;
    await sendMessage({
      variables: { input: { id, text } },
      optimisticResponse: {
        SendMessage: {
          __typename: "Message",
          id: "tmp",
          text,
          timestamp: new Date().toISOString(),
          gameUser: gameUserData.GameUser
        }
      },
      update(cache, { data, errors }) {
        if (errors) {
          setHasError(true);

          setTimeout(() => {
            setHasError(false);
          }, 250);
        } else {
          const cachedData = cache.readQuery<GetMessagesQuery>({
            query: GetMessagesDocument,
            variables: { id }
          });

          cache.writeQuery<GetMessagesQuery>({
            query: GetMessagesDocument,
            variables: { id },
            data: {
              ...cachedData,
              GetMessages: [
                ...cachedData.GetMessages.filter((m) => m.id !== "tmp"),
                data.SendMessage
              ]
            }
          });

          setText("");
        }
      }
    });
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    onSubmit();
  };

  return (
    <InputGroup marginTop="auto">
      <Input
        type="text"
        focusBorderColor="blue.300"
        borderRadius="md"
        pr="40px"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        onKeyPress={onKeyPress}
      />
      <InputRightElement width="40px">
        <IconButton
          aria-label="Envoyer"
          size="sm"
          icon={<FiSend size="16px" />}
          disabled={text === ""}
          onClick={onSubmit}
          colorScheme={hasError ? "red" : "gray"}
        />
      </InputRightElement>
    </InputGroup>
  );
};
