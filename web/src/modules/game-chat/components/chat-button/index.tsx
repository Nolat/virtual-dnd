import { Badge, Button, HStack, Kbd, MenuButton, Text } from "@chakra-ui/react";
import { FiMessageCircle } from "react-icons/fi";

import { useChatStore } from "modules/game-chat/store/useChatStore";

export const ChatButton: React.FC = () => {
  const hasMessage = false;

  const { toggle } = useChatStore();

  return (
    <MenuButton
      as={Button}
      rightIcon={
        hasMessage ? (
          <Badge fontSize="0.8em" colorScheme="orange" borderRadius="full">
            2
          </Badge>
        ) : (
          <FiMessageCircle size={18} />
        )
      }
      variant="outline"
      w={300}
      justifyContent="space-between"
      onClick={toggle}
    >
      <HStack spacing={4}>
        <Text>Messages</Text>
        <HStack spacing="4px">
          <Kbd color="gray.500" rounded="2px">
            ⇧
          </Kbd>
          <Kbd color="gray.500" rounded="2px">
            T
          </Kbd>
        </HStack>
      </HStack>
    </MenuButton>
  );
};
