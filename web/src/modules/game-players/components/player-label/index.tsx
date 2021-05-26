import { Box, Button } from "@chakra-ui/react";
import React from "react";

export const PlayerLabel: React.FC<PlayerLabelProps> = ({ name, color }) => {
  return (
    <Button
      leftIcon={<Box width={2} height={2} borderRadius="full" bg={color} />}
      variant="outline"
      size="sm"
      borderRadius="full"
    >
      {name}
    </Button>
  );
};

export interface PlayerLabelProps {
  name: string;
  color: string;
}
