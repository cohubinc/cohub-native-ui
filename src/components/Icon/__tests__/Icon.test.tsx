import React from "react";
import upperFirst from "lodash/upperFirst";

import Icon, { iconNames } from "../";
import { render } from "@testing-library/react-native";
import "./extendExpect";

describe("Icon component", () => {
  iconNames.forEach(name => {
    if (name === "user") {
      return;
    }
    it(`renders ${name} using the name prop API`, () => {
      const accessibilityLabel = `${name} button`;
      const { queryByLabelText } = render(
        <Icon name={name} accessibilityLabel={accessibilityLabel} />
      );
      expect(queryByLabelText(accessibilityLabel)).toBeTruthy();
    });

    const StaticMethodName = upperFirst(name);

    it(`has a static method named ${StaticMethodName}`, () => {
      expect(Icon).toHaveAStaticMethodNamed(StaticMethodName);
    });
  });

  // This is just a Control Group of sorts
  it(`It doesn't have a method named FooBar`, () => {
    expect(Icon).not.toHaveAStaticMethodNamed("FooBar");
  });
});
