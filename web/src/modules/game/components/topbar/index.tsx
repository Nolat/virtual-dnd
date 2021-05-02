import { Flex, FlexProps } from "@chakra-ui/react";

export const Topbar: React.FC<FlexProps> = ({ ...props }) => {
  return <Flex {...props} position="fixed" w="100%" h="64px" top={0}></Flex>;
};
