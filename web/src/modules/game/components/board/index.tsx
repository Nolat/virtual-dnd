import { Box, useColorModeValue } from "@chakra-ui/react";
import { Rect, Stage } from "react-konva";

import { useWindowSize } from "hooks";

import { Layer } from "..";

export const Board: React.FC = () => {
  const bgColor = useColorModeValue("gray.200", "gray.800");
  const { width, height } = useWindowSize();

  return (
    <Box w="calc(100% - 128px)" h="100%" bg={bgColor} mt="64px" mb={0} borderTopRadius="4xl">
      <Stage width={width - 128} height={height - 64} draggable>
        <Layer>
          <Rect x={0} y={0} width={100} height={100} fill="red" shadowBlur={10} draggable />
        </Layer>
      </Stage>
    </Box>
  );
};
