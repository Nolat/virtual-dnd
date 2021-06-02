import { Icon, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const D100Icon: React.FC = () => {
  const color = useColorModeValue("black", "white");

  return (
    <>
      <Icon viewBox="0 0 32 29" fill={color} width="15px" height="15px" mr={1}>
        <path d="M16 0L0 12l1 6 15 11 15-11 1-6L16 0zm13.7 12.8l-.5 3.2-3.5-1.7-5.4-9 9.4 7.5zM15 19.6v6.1l-11.1-8L7 16.1l8 3.5zm2 0l8-3.5 3.1 1.6L17 25.8v-6.2zm6.6-5.1L16 17.9l-7.6-3.4L16 2.9l7.6 11.6zM2.3 12.8l9.4-7.5-5.4 9L2.8 16l-.5-3.2z" />
      </Icon>
      <Icon viewBox="0 0 32 29" fill={color} width="15px" height="15px">
        <path d="M16 0L0 12l1 6 15 11 15-11 1-6L16 0zm13.7 12.8l-.5 3.2-3.5-1.7-5.4-9 9.4 7.5zM15 19.6v6.1l-11.1-8L7 16.1l8 3.5zm2 0l8-3.5 3.1 1.6L17 25.8v-6.2zm6.6-5.1L16 17.9l-7.6-3.4L16 2.9l7.6 11.6zM2.3 12.8l9.4-7.5-5.4 9L2.8 16l-.5-3.2z" />
      </Icon>
    </>
  );
};
