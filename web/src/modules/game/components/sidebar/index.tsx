import { Flex, FlexProps } from "@chakra-ui/react";

export const Sidebar: React.FC<SidebarProps> = ({ side, ...props }) => {
  const sideProps = side === "left" ? { left: 0 } : { right: 0 };
  return (
    <Flex
      {...props}
      position="fixed"
      {...sideProps}
      w="64px"
      h="100%"
      top={0}
      p={2}
      justifyContent="center"
    />
  );
};

export interface SidebarProps extends FlexProps {
  side: "left" | "right";
}
