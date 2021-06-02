import { Box, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";

import { MessageFieldsFragment, useMeQuery } from "common/definitions/graphql/generated";
import { MessageBubble, RollResultMessage } from "modules/game-chat/components";

export const ChatContent: React.FC<ChatContentProps> = ({ messages }) => {
  const { data: meData, loading } = useMeQuery();

  const color = useColorModeValue("black", "white");

  return (
    <ScrollableFeed className="scrollbar">
      {loading && <Spinner />}

      {!loading && (
        <Box mb={1}>
          {messages?.map((m, index) => {
            switch (m?.__typename) {
              case "UserMessage":
                return (
                  <MessageBubble
                    key={m.id}
                    isMine={m.gameUser.user.id === meData?.me?.id}
                    userName={m.gameUser.name}
                    userColor={m.gameUser.color}
                    timestamp={m.timestamp}
                    sameSenderThanPrevious={messages[index - 1]?.gameUser.id === m.gameUser.id}
                  >
                    <Text fontSize="sm" color={color}>
                      {m.text}
                    </Text>
                  </MessageBubble>
                );

              case "RollMessage":
                return (
                  <MessageBubble
                    key={m.id}
                    isMine={m.gameUser.user.id === meData?.me?.id}
                    userName={m.gameUser.name}
                    userColor={m.gameUser.color}
                    timestamp={m.timestamp}
                    sameSenderThanPrevious={messages[index - 1]?.gameUser.id === m.gameUser.id}
                  >
                    <RollResultMessage result={m.result} />
                  </MessageBubble>
                );

              default: {
                return null;
              }
            }
          })}
        </Box>
      )}
    </ScrollableFeed>
  );
};

export interface ChatContentProps {
  messages: MessageFieldsFragment[];
}
