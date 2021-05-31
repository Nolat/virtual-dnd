import { Flex, FlexProps } from "@chakra-ui/react";

export const Topbar: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex
      {...props}
      position="fixed"
      w="calc(100% - 148px)"
      h="64px"
      top={0}
      alignItems="center"
      justifyContent="space-between"
    ></Flex>
  );
};
