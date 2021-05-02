import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

import { IconButton } from "components";

export const ColorModeButton: React.FC = () => {
  const color = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      icon={isDark ? <FiMoon /> : <FiSun />}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      tooltip={`Switch to ${isDark ? "light" : "dark"} mode`}
      tooltipPlacement="auto"
      onClick={toggleColorMode}
      color={color}
    />
  );
};
