import "@testing-library/jest-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { RenderOptions, RenderResult, render as baseRender } from "@testing-library/react";
import React, { ReactElement } from "react";

import theme from "../src/common/definitions/chakra/theme";

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

// TODO: Fix wrapper typing
const render = (ui: ReactElement, options?: Omit<RenderOptions, "queries">) =>
  baseRender(ui, { wrapper: AllTheProviders as any, ...options }) as RenderResult;

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
