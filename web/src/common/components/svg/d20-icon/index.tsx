import { Icon, useColorModeValue } from "@chakra-ui/react";

export const D20Icon: React.FC = () => {
  const color = useColorModeValue("black", "white");

  return (
    <Icon viewBox="0 0 28 31" fill={color} width="20px" height="20px">
      <path d="M14 0L0 7.5v15.2l14 7.5 13-7 1-.6V7.5L14 0zm-2 8.3l-5.9 8.8-3.7-8 9.6-.8zM8 18l6-9.1 6 9.1H8zm13.8-.9L16 8.3l9.5.7-3.7 8.1zM15 2.8l7.4 4-7.4-.6V2.8zm-2 0v3.4l-7.4.6 7.4-4zm-11 10l2.7 6L2 20.4v-7.6zm1 9.3l2.7-1.6 4.4 5.5L3 22.1zM8 20h11l-5 7.5L8 20zm9.9 5.9l4.4-5.5L25 22l-7.1 3.9zm5.6-7l-.2-.1 2.7-6v7.6l-2.5-1.5z" />
    </Icon>
  );
};
