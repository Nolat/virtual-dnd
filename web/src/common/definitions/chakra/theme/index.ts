import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em"
});

const theme = extendTheme({
  colors: {
    black: "#060607",
    blue: {
      "50": "#E8E6FE",
      "100": "#C0B9FD",
      "200": "#978CFC",
      "300": "#6E60FB",
      "400": "#4633FA",
      "500": "#1D06F9",
      "600": "#1705C7",
      "700": "#110396",
      "800": "#0C0264",
      "900": "#060132"
    },
    gray: {
      "50": "#F1F2F3",
      "100": "#D9DADE",
      "200": "#C0C3C8",
      "300": "#A8ABB3",
      "400": "#8F939E",
      "500": "#777C88",
      "600": "#5F636D",
      "700": "#474A52",
      "800": "#2F3137",
      "900": "#202225"
    }
  },
  fonts,
  breakpoints,
  radii: { "4xl": "3rem" },
  initialColorMode: "light",
  useSystemColorMode: true
});

export default theme;
