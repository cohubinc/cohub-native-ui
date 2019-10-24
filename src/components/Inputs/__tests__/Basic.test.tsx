import React, { useState } from "react";
import { View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import Inputs from "../index";
import { Buttons } from "src";

const accessibilityLabel = "Products";

function BasicInput({ initVal = "" }: { initVal?: string }) {
  const [value, setValue] = useState(initVal);
  return (
    <View>
      <Inputs.Basic
        input={{ value, onChange: setValue }}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}

describe("Inputs.Basic component", () => {
  it("renders the correct value", () => {
    const { getByLabelText } = render(
      <Inputs.Basic
        input={{ value: "pants" }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    const val = getByLabelText(accessibilityLabel).getProp("value");

    expect(val).toEqual("pants");
  });

  it("accessibilityLabel can get generated from the label", () => {
    const { getByLabelText } = render(<Inputs.Basic label="name" />);

    expect(getByLabelText("name")).toBeTruthy();
  });

  it("accessibilityLabel can get generated from the placeholder", () => {
    const { getByLabelText } = render(
      <Inputs.Basic placeholder="first name" />
    );

    expect(getByLabelText("first name")).toBeTruthy();
  });

  it("warns you if you don't pass in label or placeholder or accessibilityLabel", () => {
    const consoleWarn = console.warn;
    const warnMock = jest.fn(msg => msg);
    console.warn = warnMock;

    render(<Inputs.Basic />);

    expect(warnMock.mock.calls[0][0]).toEqual(
      "You should be passing an accessibilityLabel prop if your not going to define label or placeholder"
    );

    console.warn = consoleWarn;
  });

  it("Typing into the input works", () => {
    const { getByLabelText } = render(<BasicInput initVal="" />);

    fireEvent.changeText(getByLabelText(accessibilityLabel), "Skinny jeans");

    const val = getByLabelText(accessibilityLabel).getProp("value");

    expect(val).toEqual("Skinny jeans");
  });

  it("When changing the value from outside the component the UI stays in sync", () => {
    const { getByLabelText, getByText } = render(
      <BasicTestDemo initialValue="Apple Bottom Jeans" />
    );
    const getVal = () => getByLabelText(accessibilityLabel).getProp("value");

    expect(getVal()).toEqual("Apple Bottom Jeans");

    fireEvent.press(getByText("clear value"));

    expect(getVal()).toBeUndefined();
  });

  it("When changing the value from outside the component and internally the UI stays in sync", () => {
    const { getByLabelText, getByText } = render(<BasicTestDemo />);

    fireEvent.changeText(
      getByLabelText(accessibilityLabel),
      "Boots with the fur"
    );

    fireEvent.press(getByText("clear value"));

    fireEvent.changeText(getByLabelText(accessibilityLabel), "Boots");

    const val = getByLabelText(accessibilityLabel).getProp("value");

    expect(val).toEqual("Boots");
  });
});

function BasicTestDemo({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);

  return (
    <View>
      <Inputs.Basic
        input={{ value, onChange: setValue }}
        accessibilityLabel={accessibilityLabel}
      />

      <Buttons onPress={() => setValue("")} label="clear value" />
    </View>
  );
}
