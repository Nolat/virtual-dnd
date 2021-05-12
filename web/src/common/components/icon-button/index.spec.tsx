import React from "react";

import { fireEvent, render } from "test";

import { Light } from "./index.stories";

describe("Icon button component", () => {
  it("should be clickable", () => {
    const fn = jest.fn();
    const { getByTestId } = render(<Light onClick={fn} />);
    const button = getByTestId("icon-button");
    fireEvent.click(button);
    expect(fn).toBeCalledTimes(1);
  });
});
