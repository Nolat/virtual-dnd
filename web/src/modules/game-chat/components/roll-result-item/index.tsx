import { Box, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import { DiceIcon } from "common/components";
import { DiceResult, DiceType } from "common/definitions/graphql/generated";

export const RollResultItem: React.FC<RollResultItemProps> = ({
  diceResult,
  isLast,
  iconColor
}) => {
  const color = useColorModeValue("black", "white");
  const minColor = useColorModeValue("red.500", "red.400");
  const maxColor = useColorModeValue("green.500", "green.400");
  const iconOpacity = useColorModeValue(1, 0.5);

  return (
    <>
      <Tooltip label={valueToType(diceResult.dice) || diceResult.dice} hasArrow placement="top">
        <Box position="relative" textAlign="center" display="inline-block" minW="15px">
          <Box px={1} opacity={iconOpacity}>
            <DiceIcon dice={DiceType[valueToType(diceResult.dice)]} color={iconColor} />
          </Box>

          <Text
            position="relative"
            top={0}
            fontWeight="bold"
            color={isMin(diceResult.result) ? minColor : isMax(diceResult) ? maxColor : color}
          >
            {diceResult.result}
          </Text>
        </Box>
      </Tooltip>

      {!isLast && <Text fontWeight="bold"> + </Text>}
    </>
  );
};

const isMin = (value: number) => value === 1;

const isMax = ({ dice, result }: DiceResult) => {
  return dice === result;
};

const valueToType = (value) => {
  switch (value) {
    case 4:
      return DiceType.D4;

    case 6:
      return DiceType.D6;

    case 8:
      return DiceType.D8;

    case 10:
      return DiceType.D10;

    case 12:
      return DiceType.D12;

    case 20:
      return DiceType.D20;

    case 100:
      return DiceType.D100;

    default:
      return;
  }
};

export interface RollResultItemProps {
  diceResult: DiceResult;
  isLast: boolean;
  iconColor: string;
}
