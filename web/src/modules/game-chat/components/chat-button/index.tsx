import { Badge, Button, HStack, Kbd, MenuButton, Text } from "@chakra-ui/react";
import { FiMessageCircle } from "react-icons/fi";
import { IHookStateSetAction } from "react-use/lib/misc/hookState";

import { useChatStore } from "modules/game-chat/store/useChatStore";

export const ChatButton: React.FC<ChatButtonProps> = ({ newMessageCount, reset }) => {
  const { isOpen, toggle } = useChatStore();

  const onClick = () => {
    toggle();
    reset();
  };

  return (
    <MenuButton
      as={Button}
      rightIcon={
        newMessageCount > 0 && !isOpen ? (
          <Badge fontSize="0.8em" colorScheme="orange" borderRadius="full">
            {newMessageCount}
          </Badge>
        ) : (
          <FiMessageCircle size={18} />
        )
      }
      variant="outline"
      w={300}
      justifyContent="space-between"
      onClick={onClick}
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

interface ChatButtonProps {
  newMessageCount: number;
  reset: (value?: IHookStateSetAction<number>) => void;
}
