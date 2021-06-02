import { Icon, useColorModeValue } from "@chakra-ui/react";

export const D4Icon: React.FC = () => {
  const color = useColorModeValue("black", "white");

  return (
    <Icon viewBox="0 0 31 27" width="20px" height="20px" fill="none">
      <path
        stroke={color}
        strokeWidth={1.75}
        d="M14.5 2L2 25.5h22.5M14.5 2l10 23.5M14.5 2l15 11-5 12.5"
      />
    </Icon>
  );
};
