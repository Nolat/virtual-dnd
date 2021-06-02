import { Icon, useColorModeValue } from "@chakra-ui/react";

export const D8Icon: React.FC = () => {
  const color = useColorModeValue("black", "white");

  return (
    <Icon viewBox="0 0 26 31" fill={color} width="20px" height="20px">
      <path d="M13 0L0 8v13l13 10 13-10V8L13 0zm11 15.9L17 4.5 24 9v6.9zM13 2l.1.1L24.2 20H1.8L12.9 2.1 13 2zM9 4.5L2 15.9V9l7-4.5zM3.9 22h18.2L13 28.5 3.9 22z" />
    </Icon>
  );
};
