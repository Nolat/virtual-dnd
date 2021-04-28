import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import { RenderOptions, RenderResult, render as baseRender } from "@testing-library/react";
import React, { ReactElement } from "react";

/**
 * Custom renderer example with @testing-library/react
 * You can customize it to your needs.
 *
 * To learn more about customizing renderer,
 * please visit https://testing-library.com/docs/react-testing-library/setup
 */

export const AllTheProviders = ({ children }) => {
  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};

const render = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
  baseRender(ui, { wrapper: AllTheProviders, ...options }) as RenderResult;

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
