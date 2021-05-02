import React from "react";
import { act } from "react-dom/test-utils";

import { fireEvent, render, screen } from "test";

import { Dark, Light } from "./index.stories";

describe("Color mode button component", () => {
  it("should display dark on dark mode", async () => {
    render(<Dark />);

    act(() => {
      fireEvent.mouseOver(screen.getByTestId("icon-button"));
    });

    await screen.findByTestId("icon-button-tooltip");

    expect(screen.getByText("Switch to light mode")).toBeInTheDocument();
    expect(screen.getByTestId("icon-button-tooltip")).toBeInTheDocument();
  });

  it("should display light on light mode", async () => {
    render(<Light />);

    act(() => {
      fireEvent.mouseOver(screen.getByTestId("icon-button"));
    });

    await screen.findByTestId("icon-button-tooltip");

    expect(screen.getByText("Switch to dark mode")).toBeInTheDocument();
    expect(screen.getByTestId("icon-button-tooltip")).toBeInTheDocument();
  });
});
