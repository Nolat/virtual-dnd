import { Box } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";

import { MessageFieldsFragment, useMeQuery } from "common/definitions/graphql/generated";
import { MessageBubble } from "modules/game-chat/components";

export const ChatContent: React.FC<ChatContentProps> = ({ messages }) => {
  const { data: meData } = useMeQuery();

  return (
    <ScrollableFeed className="scrollbar">
      <Box mb={1}>
        {messages?.map((m, index) => {
          return (
            <MessageBubble
              key={m.id}
              isMine={m.gameUser.user.id === meData.me.id}
              userName={m.gameUser.name}
              userColor={m.gameUser.color}
              text={m.text}
              timestamp={m.timestamp}
              sameSenderThanPrevious={messages[index - 1]?.gameUser.id === m.gameUser.id}
            />
          );
        })}
      </Box>
    </ScrollableFeed>
  );
};

export interface ChatContentProps {
  messages: MessageFieldsFragment[];
}
