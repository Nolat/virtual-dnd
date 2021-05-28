import { Box, Button, Menu, MenuButton } from "@chakra-ui/react";

import { SelfPlayerMenu } from "../self-player-menu";

export const PlayerLabel: React.FC<PlayerLabelProps> = ({ name, color, isMe }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<Box width={2} height={2} borderRadius="full" bg={color} />}
        variant="outline"
        size="sm"
        borderRadius="full"
      >
        {name}
      </MenuButton>

      {isMe && <SelfPlayerMenu />}
    </Menu>
  );
};

export interface PlayerLabelProps {
  name: string;
  color: string;
  isMe: boolean;
}
