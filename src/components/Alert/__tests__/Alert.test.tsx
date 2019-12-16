import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import { Alert } from "../";

describe("Alerts", () => {
  it(`It show the message when message is a string`, () => {
    const { getByText } = render(
      <Alert message="May I have your attention, please?" />
    );

    expect(getByText("May I have your attention, please?")).toBeTruthy();
  });

  it(`It show the message when message is a string array`, () => {
    const { getByText } = render(
      <Alert
        message={[
          "May I have your attention, please?",
          "Will the real Slim Shady please stand up?"
        ]}
      />
    );

    expect(getByText("May I have your attention, please?")).toBeTruthy();
    expect(getByText("Will the real Slim Shady please stand up?")).toBeTruthy();
  });

  it(`It show the message when message is a ReactNode`, () => {
    const { getByText } = render(
      <Alert
        message={
          <Text>I Repeat, will the real Slim Shady please stand up?</Text>
        }
      />
    );

    expect(
      getByText("I Repeat, will the real Slim Shady please stand up?")
    ).toBeTruthy();
  });
});
