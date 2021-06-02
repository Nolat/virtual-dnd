import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import { RollDiceResult } from "common/definitions/graphql/generated";

import { RollResultItem } from "../roll-result-item";

export const RollResultMessage: React.FC<RollResultMessageProps> = ({ result }) => {
  const color = useColorModeValue("black", "white");

  return (
    <Flex borderRadius="md" justifyContent="center" alignItems="center" flexWrap="wrap">
      {result.results.map((r, index) => (
        <RollResultItem
          key={index}
          diceResult={r}
          isLast={index === result.results.length - 1}
          iconColor={color}
        />
      ))}

      {result.results.length > 1 && <Text fontWeight="bold">{`= ${result.sum}`}</Text>}
    </Flex>
  );
};

export interface RollResultMessageProps {
  result: RollDiceResult;
}
