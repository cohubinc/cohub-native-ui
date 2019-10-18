import React from "react";
import { render } from "@testing-library/react-native";

import Inputs from "../index";

describe("Input.Stepper", () => {
  it("renders the correct value", () => {
    const value = 4;
    const { getByTestId, getByText } = render(
      <Inputs.Stepper input={{ value }} />
    );

    const val = getByTestId("stepper-input").getProp("value");

    expect(val).toEqual(value.toString());
  });
});
