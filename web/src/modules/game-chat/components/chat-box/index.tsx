import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuList,
  useColorModeValue
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { Rnd } from "react-rnd";
import { useUpdateEffect } from "react-use";
import useKeyboardJs from "react-use/lib/useKeyboardJs";

import { useChatStore } from "modules/game-chat/store/useChatStore";

import { ChatButton } from "../chat-button";
import { PinChatButton } from "../pin-chat-button";
import { PopOutChatButton } from "..";

export const ChatBox: React.FC = () => {
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

  return (
    <Menu
      isOpen={isOpen}
      onClose={close}
      closeOnSelect={false}
      closeOnBlur={!isPinned && !isPoppedOut}
    >
      <ChatButton />

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
          >
            <Flex flexDir="column" w="100%">
              <HStack alignSelf="flex-end" spacing={0.5}>
                {!isPoppedOut && <PinChatButton />}
                <PopOutChatButton />
              </HStack>
            </Flex>

            <InputGroup marginTop="auto">
              <Input type="text" focusBorderColor="blue.300" borderRadius="md" pr="40px" />
              <InputRightElement width="40px">
                <IconButton aria-label="Envoyer" size="sm" icon={<FiSend size="16px" />} />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Rnd>
      </MenuList>
    </Menu>
  );
};
