import { Flex, FlexProps, useColorModeValue } from "@chakra-ui/react";

export const Container: React.FC<FlexProps> = (props: FlexProps) => {
  const bgColor = useColorModeValue("white", "black");
  const color = useColorModeValue("black", "white");

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor}
      color={color}
      height="100vh"
      {...props}
    />
  );
};
