import { Box, Flex, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import React from "react";

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  isMine,
  userColor,
  userName,
  text,
  timestamp,
  sameSenderThanPrevious
}) => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const bgMine = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("black", "white");

  return (
    <Flex px={1} pt={sameSenderThanPrevious ? 1 : 2}>
      <Flex flexDirection="column" width="100%">
        {!sameSenderThanPrevious && (
          <Tag
            variant="subtle"
            fontSize="xs"
            bg="none"
            color="white"
            mr={isMine ? null : "auto"}
            ml={isMine ? "auto" : null}
          >
            <Box width={2} height={2} borderRadius="full" bg={userColor} mr={1} />
            <Text color={color}>{userName}</Text>
          </Tag>
        )}
        <Flex
          bg={isMine ? bgMine : bg}
          pr={2}
          py={1}
          pl={4}
          borderRadius={12}
          mr={isMine ? null : "auto"}
          ml={isMine ? "auto" : null}
        >
          <Text fontSize="sm" maxWidth={400} color={color}>
            {text}
          </Text>
          <Flex
            mr={isMine ? null : "auto"}
            ml={isMine ? "auto" : null}
            mt="auto"
            pl={4}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Text fontSize={12} color="gray.500">
              {format(parseISO(timestamp), "hh:mm")}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export interface MessageBubbleProps {
  isMine: boolean;
  userColor: string;
  userName: string;
  text: string;
  timestamp: string;
  sameSenderThanPrevious: boolean;
}
