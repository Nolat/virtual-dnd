import { Badge, Box, Flex, Text } from "@chakra-ui/layout";
import { Img, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const AssetPreview: React.FC<AssetPreviewProps> = ({
  name,
  badgeText,
  imageUrl,
  isSelected,
  onClick
}: AssetPreviewProps) => {
  const badgeBgColor = useColorModeValue("white", "black");
  const badgeColor = useColorModeValue("black", "white");

  return (
    <Box width={200} height={200} borderRadius="md" cursor="pointer" onClick={onClick}>
      <Img
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        objectFit="cover"
        position="absolute"
        borderRadius="md"
      />
      <Flex
        width={200}
        height={200}
        justifyContent="center"
        alignItems="flex-end"
        position="absolute"
        borderRadius="md"
        bgGradient="linear(to-b, transparent 65%, black)"
      >
        <Text color="white" fontWeight="medium" marginBottom={2}>
          {name}
        </Text>
      </Flex>
      <Box
        width={200}
        height={200}
        borderRadius="md"
        position="absolute"
        borderWidth={isSelected ? 4 : 0}
        borderColor={isSelected ? "blue.300" : undefined}
      />
      {badgeText && (
        <Badge m={2} position="absolute" bg={badgeBgColor} color={badgeColor}>
          {badgeText}
        </Badge>
      )}
    </Box>
  );
};

export interface AssetPreviewProps {
  name: string;
  badgeText?: string;
  imageUrl: string;
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
