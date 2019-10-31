import React from "react";
import upperFirst from "lodash/upperFirst";

import Icon, { iconNames } from "../";
import { render, fireEvent } from "@testing-library/react-native";
import "./extendExpect";
import times from "lodash/times";

describe("Icon component", () => {
  iconNames.forEach(name => {
    if (name === "user") {
      return;
    }
    const accessibilityLabel = name;
    it(`renders ${name} using the name prop API`, () => {
      const { queryByLabelText } = render(
        <Icon name={name} accessibilityLabel={accessibilityLabel} />
      );
      expect(queryByLabelText(accessibilityLabel)).toBeTruthy();
    });

    const StaticMethodName = upperFirst(name);

    it(`has a static method named ${StaticMethodName}`, () => {
      expect(Icon).toHaveAStaticMethodNamed(StaticMethodName);
    });

    it(`accessibilityLabel default to name: ${name}`, () => {
      const { getByLabelText } = render(
        <Icon name={name} onPress={() => null} />
      );

      expect(getByLabelText(name)).toBeTruthy();
    });

    it(`${name} handles onPress as expected`, () => {
      const onPressMock = jest.fn();
      const { getByLabelText } = render(
        <Icon
          name={name}
          onPress={onPressMock}
          accessibilityLabel={accessibilityLabel}
        />
      );
      times(3, () => fireEvent.press(getByLabelText(accessibilityLabel)));

      expect(onPressMock.mock.calls.length).toBe(3);
    });
  });

  // This is just a Control Group of sorts
  it(`It doesn't have a method named FooBar`, () => {
    expect(Icon).not.toHaveAStaticMethodNamed("FooBar");
  });
});
