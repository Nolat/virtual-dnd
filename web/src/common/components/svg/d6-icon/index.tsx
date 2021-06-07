import { Icon, useColorModeValue } from "@chakra-ui/react";

export const D6Icon: React.FC<D6IconProps> = ({ color }) => {
  const baseColor = useColorModeValue("black", "white");

  return (
    <Icon viewBox="0 0 27 27" width="20px" height="20px" fill="none">
      <path
        stroke={color ?? baseColor}
        strokeWidth={1.75}
        d="M1 6.978h17.602M1 6.978L10.444 1H26M1 6.978V26h17.602m0-19.022L26 1m-7.398 5.978V26M26 1v17.391L18.602 26"
      />
    </Icon>
  );
};

interface D6IconProps {
  color?: string;
}
