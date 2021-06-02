import { Icon, useColorModeValue } from "@chakra-ui/react";

export const D12Icon: React.FC = () => {
  const color = useColorModeValue("black", "white");

  return (
    <Icon viewBox="0 0 30 32" fill={color} width="20px" height="20px">
      <path d="M25 4L15 0 5 4l-5 7v10l6 7 9 4 9-4 6-7V11l-5-7zM2 11.9L6 14l3.7 8.2-3.4 3.4L2 21v-9.1zM12 22l-3.7-7.2L15 9.2l6.7 5.5L18 22h-6zm16-1l-4.3 4.7-3.4-3.4L24 14l4-2.1V21zM16 2.2l7.8 3.6L27 10l-4.5 2.6L16 7.5V2.2zM6.2 5.8L14 2.2v5.2l-6.5 5.1-.5-.1L3 10l3.2-4.2zm2.1 21l3-3h7.5l3 3L15 30l-6.7-3.2z" />
    </Icon>
  );
};
