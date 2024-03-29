import React, { useState } from "react";
import { View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import times from "lodash/times";
import random from "lodash/random";

import Inputs from "../index";
import { Buttons } from "src";

const getStepForwardLabel = (step = 1) => `adjust count up by ${step}`;
const getStepBackLabel = (step = 1) => `adjust count down by ${step}`;
const txtInputLabel = "product count";
const accessibilityLabel = "product";

describe("Input.Stepper", () => {
  it("renders the correct value", () => {
    const value = 4;
    const { getByLabelText } = render(
      <Inputs.Stepper
        input={{ value }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual("4");
  });

  it("increasing a value with the buttons works as expected", () => {
    const startVal = 4;
    const { getByLabelText } = render(
      <Inputs.Stepper
        input={{ value: startVal }}
        accessibilityLabel={accessibilityLabel}
      />
    );
    const numPresses = random(1, 40);

    times(numPresses, () =>
      fireEvent.press(getByLabelText(getStepForwardLabel()))
    );

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual((numPresses + startVal).toString());
  });

  it("decreasing a value with the buttons works as expected", () => {
    const startVal = 100;
    const { getByLabelText } = render(
      <Inputs.Stepper
        input={{ value: startVal }}
        accessibilityLabel={accessibilityLabel}
      />
    );
    const numPresses = random(1, 40);

    times(numPresses, () =>
      fireEvent.press(getByLabelText(getStepBackLabel()))
    );

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual((startVal - numPresses).toString());
  });

  it("Typing into the text input works", () => {
    const { getByLabelText } = render(
      <Inputs.Stepper
        input={{ value: 0 }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    fireEvent.changeText(getByLabelText(txtInputLabel), "33");

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual("33");
  });

  it("Typing into non-numeric chars into the text input doesn't get your very far", () => {
    const { getByLabelText } = render(
      <Inputs.Stepper
        input={{ value: 0 }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    fireEvent.changeText(getByLabelText(txtInputLabel), "not gonna fly! $%*&");

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual("0");
  });

  it("Setting the `step` prop adjust the rate at which the plus button increases the input value", () => {
    const step = 5;
    const { getByLabelText } = render(
      <Inputs.Stepper
        step={5}
        input={{ value: 0 }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    times(5, () => fireEvent.press(getByLabelText(getStepForwardLabel(step))));

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual("25");
  });

  it("Setting the `step` prop adjust the rate at which the minus button decreases the input value", () => {
    const step = 2;
    const { getByLabelText } = render(
      <Inputs.Stepper
        step={step}
        input={{ value: 100 }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    times(12, () => fireEvent.press(getByLabelText(getStepBackLabel(step))));

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual("76");
  });

  it("Setting the `allowNegative` prop to true lets you set a negative count", () => {
    const { getByLabelText } = render(
      <Inputs.Stepper
        allowNegative
        input={{ value: 0 }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    times(12, () => fireEvent.press(getByLabelText(getStepBackLabel())));

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual("-12");
  });

  it("By default you can't set the value to a negative number", () => {
    const { getByLabelText } = render(
      <Inputs.Stepper
        input={{ value: 0 }}
        accessibilityLabel={accessibilityLabel}
      />
    );

    times(46, () => fireEvent.press(getByLabelText(getStepBackLabel())));

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual("0");
  });

  it("onRemove gets called when you try to go negative by default", () => {
    const onRemoveSpy = jest.fn();

    const { getByLabelText } = render(
      <Inputs.Stepper
        input={{ value: 0 }}
        onRemove={onRemoveSpy}
        accessibilityLabel={accessibilityLabel}
      />
    );

    fireEvent.press(getByLabelText("remove item"));

    expect(onRemoveSpy.mock.calls.length).toBe(1);
  });

  it("onRemove doesn't get called when allowNegative is true", () => {
    const onRemoveSpy = jest.fn();

    const { getByLabelText } = render(
      <Inputs.Stepper
        allowNegative
        input={{ value: 0 }}
        onRemove={onRemoveSpy}
        accessibilityLabel={accessibilityLabel}
      />
    );

    times(3, () => fireEvent.press(getByLabelText(getStepBackLabel())));

    expect(onRemoveSpy.mock.calls.length).toBe(0);
  });

  it("onRemove gets called when you try to go below lowerLimit", () => {
    const onRemoveSpy = jest.fn();

    const { getByLabelText } = render(
      <Inputs.Stepper
        lowerLimit={2}
        input={{ value: 2 }}
        onRemove={onRemoveSpy}
        accessibilityLabel={accessibilityLabel}
      />
    );

    fireEvent.press(getByLabelText("remove item"));

    expect(onRemoveSpy.mock.calls.length).toBe(1);
  });

  it("onRemove doesn't get called when you aren't trying to go below lowerLimit", () => {
    const onRemoveSpy = jest.fn();

    const { getByLabelText } = render(
      <Inputs.Stepper
        lowerLimit={2}
        input={{ value: 5 }}
        onRemove={onRemoveSpy}
        accessibilityLabel={accessibilityLabel}
      />
    );

    fireEvent.press(getByLabelText(getStepBackLabel()));
    fireEvent.press(getByLabelText(getStepBackLabel()));

    expect(onRemoveSpy.mock.calls.length).toBe(0);
  });

  it("When changing the value from outside the stepper button the UI stays in sync", () => {
    const { getByLabelText, getByText } = render(<StepperTestDemo />);

    times(5, () => fireEvent.press(getByText("increase value")));

    const val = getByLabelText(txtInputLabel).props.value;

    expect(val).toEqual("5");
  });

  it("When changing the value from outside the stepper button and internally the UI stays in sync", () => {
    const { getByLabelText, getByText } = render(<StepperTestDemo />);

    // Add 5 externally
    times(5, () => fireEvent.press(getByText("increase value")));

    // Remove 2 internally
    times(2, () => fireEvent.press(getByLabelText(getStepBackLabel())));

    // Add 3 externally
    times(3, () => fireEvent.press(getByText("increase value")));

    // Add 4 internally
    times(4, () => fireEvent.press(getByLabelText(getStepForwardLabel())));

    // Give it time for the state to update
    setTimeout(() => {
      const val = getByLabelText(txtInputLabel).props.value;

      expect(val).toEqual("10");
    }, 250);
  });
});

function StepperTestDemo() {
  const [value, setValue] = useState(0);

  return (
    <View>
      <Inputs.Stepper
        accessibilityLabel={accessibilityLabel}
        input={{ value, onChange: setValue }}
      />

      <Buttons
        onPress={() => setValue((val) => val + 1)}
        label="increase value"
      />
    </View>
  );
}

const sleep = async (ms = 500) => new Promise((r) => setTimeout(r, ms));
