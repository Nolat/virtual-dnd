import { Flex, HStack, Menu, MenuList, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Rnd } from "react-rnd";
import { useCounter, useEffectOnce, useUpdateEffect } from "react-use";
import useKeyboardJs from "react-use/lib/useKeyboardJs";

import cache from "common/definitions/apollo/cache";
import {
  GetMessagesDocument,
  GetMessagesQuery,
  useGetMessagesQuery,
  useMeQuery,
  useOnMessageReceivedSubscription
} from "common/definitions/graphql/generated";
import { ChatContent, SendMessageInput } from "modules/game-chat/containers";
import { useChatStore } from "modules/game-chat/store/useChatStore";

import { ChatButton } from "../chat-button";
import { PinChatButton } from "../pin-chat-button";
import { PopOutChatButton } from "..";

export const ChatBox: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    isOpen,
    open,
    close,
    isPinned,
    isPoppedOut,
    rndPos,
    setRndPos,
    rndSize,
    setRndSize
  } = useChatStore();

  const bg = useColorModeValue("white", "black");
  const scrollBg = useColorModeValue("gray.100", "gray.800");
  const scrollBgHover = useColorModeValue("gray.200", "gray.700");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");

  // * Handle shortcuts to open & close the chat box
  const [isPressed] = useKeyboardJs("shift + t");
  const [isEscapePressed] = useKeyboardJs("escape");

  useUpdateEffect(() => {
    if (isPressed && !isOpen) open();
  }, [isPressed]);

  useUpdateEffect(() => {
    if (isEscapePressed && isOpen) close();
  }, [isEscapePressed]);

  // * Handle cache initialization
  useEffectOnce(() => {
    const cachedData = cache.readQuery<GetMessagesQuery>({
      query: GetMessagesDocument,
      variables: { id }
    });

    if (!cachedData)
      cache.writeQuery<GetMessagesQuery>({
        query: GetMessagesDocument,
        variables: { id },
        data: { __typename: "Query", GetMessages: [] }
      });
  });

  // * Handle new message count
  const [newMessageCount, { inc, reset }] = useCounter(0);

  // * Handle messages subscription
  const { data } = useGetMessagesQuery({ variables: { id }, fetchPolicy: "cache-only" });
  const { data: meData } = useMeQuery();

  useOnMessageReceivedSubscription({
    variables: { id },
    onSubscriptionData: ({ subscriptionData }) => {
      if (
        !subscriptionData?.data?.messageReceived ||
        (subscriptionData?.data?.messageReceived?.__typename === "UserMessage" &&
          subscriptionData?.data?.messageReceived?.gameUser?.user?.id === meData?.me?.id)
      )
        return;

      if (!isOpen) inc();

      const cachedData = cache.readQuery<GetMessagesQuery>({
        query: GetMessagesDocument,
        variables: { id }
      });

      cache.writeQuery<GetMessagesQuery>({
        query: GetMessagesDocument,
        variables: { id },
        data: {
          ...cachedData,
          GetMessages: [...cachedData?.GetMessages, subscriptionData?.data?.messageReceived]
        }
      });
    }
  });

  return (
    <Menu
      isOpen={isOpen}
      onClose={close}
      closeOnSelect={false}
      closeOnBlur={!isPinned && !isPoppedOut}
    >
      <ChatButton newMessageCount={newMessageCount} reset={reset} />

      <MenuList w={0} h={0} bg="transparent" borderWidth={0} shadow="none">
        <Rnd
          disableDragging={!isPoppedOut}
          enableResizing={isPoppedOut}
          default={{
            x: rndPos.x,
            y: rndPos.y,
            width: rndSize.width,
            height: rndSize.height
          }}
          position={rndPos}
          size={rndSize}
          minHeight={250}
          maxHeight={1000}
          minWidth={250}
          maxWidth={1000}
          onResize={(e, d, ref) => {
            setRndSize({ width: ref.style.width, height: ref.style.height });
          }}
          onDrag={(e, d) => {
            setRndPos({ x: d.x, y: d.y });
          }}
        >
          <Flex
            borderWidth={1}
            bg={bg}
            borderColor={borderColor}
            borderRadius="md"
            w={rndSize.width}
            h={rndSize.height}
            p={1}
            flexDir="column"
            sx={{
              ".scrollbar": {
                overflowY: "scroll",
                "::-webkit-scrollbar": { width: "10px" },
                "::-webkit-scrollbar-track": {
                  bg: bg
                },
                "::-webkit-scrollbar-thumb": {
                  bg: scrollBg,
                  border: "2px solid transparent",
                  borderRadius: "md",
                  backgroundClip: "content-box"
                },
                "::-webkit-scrollbar-thumb:hover": {
                  background: scrollBgHover,
                  border: "2px solid transparent",
                  borderRadius: "md",
                  backgroundClip: "content-box"
                }
              }
            }}
          >
            <Flex flexDir="column" w="100%" mb={1}>
              <HStack alignSelf="flex-end" spacing={0.5}>
                {!isPoppedOut && <PinChatButton />}
                <PopOutChatButton />
              </HStack>
            </Flex>

            <ChatContent messages={data?.GetMessages} />

            <SendMessageInput />
          </Flex>
        </Rnd>
      </MenuList>
    </Menu>
  );
};
