import React, { useState } from "react";
import { View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import Inputs from "../index";
import { Buttons } from "src";

const accessibilityLabel = "Search Products";

function SearchInput({ initVal = "" }: { initVal?: string }) {
  const [value, setValue] = useState(initVal);
  return (
    <View>
      <Inputs.Search
        input={{ value, onChange: setValue }}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}

describe("Inputs.Search component", () => {
  it("renders the correct value", () => {
    const { getByLabelText } = render(
      <Inputs.Search
        input={{ value: "pants" }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    const val = getByLabelText(accessibilityLabel).getProp("value");

    expect(val).toEqual("pants");
  });

  it("has a default accessibilityLabel", () => {
    const { getByLabelText } = render(<Inputs.Search />);

    expect(getByLabelText("Search")).toBeTruthy();
  });

  it("Typing into the input works", () => {
    const { getByLabelText } = render(<SearchInput initVal="" />);

    fireEvent.changeText(getByLabelText(accessibilityLabel), "Skinny jeans");

    const val = getByLabelText(accessibilityLabel).getProp("value");

    expect(val).toEqual("Skinny jeans");
  });

  it("When changing the value from outside the component the UI stays in sync", () => {
    const { getByLabelText, getByText } = render(
      <SearchTestDemo initialValue="Apple Bottom Jeans" />
    );
    const getVal = () => getByLabelText(accessibilityLabel).getProp("value");

    expect(getVal()).toEqual("Apple Bottom Jeans");

    fireEvent.press(getByText("clear value"));

    expect(getVal()).toBeUndefined();
  });

  it("When changing the value from outside the component and internally the UI stays in sync", () => {
    const { getByLabelText, getByText } = render(<SearchTestDemo />);

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

function SearchTestDemo({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);

  return (
    <View>
      <Inputs.Search
        input={{ value, onChange: setValue }}
        accessibilityLabel={accessibilityLabel}
      />

      <Buttons onPress={() => setValue("")} label="clear value" />
    </View>
  );
}
