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
      aria-label={`Passer en mode ${isDark ? "clair" : "sombre"}`}
      tooltip={`Passer en mode ${isDark ? "clair" : "sombre"}`}
      tooltipPlacement="auto"
      onClick={toggleColorMode}
      color={color}
    />
  );
};
