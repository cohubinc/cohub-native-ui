import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";

import Button from "../";
import { isLineLoaderVisible, findActiveStyle } from "src/helpers/test-utils";

const onPress = () => null;

describe("Buttons", () => {
  describe("base Button", () => {
    it("Passing label text as a string renders", () => {
      const { getByText } = render(
        <Button onPress={onPress} label="Base Button" />
      );

      expect(getByText("Base Button")).toBeTruthy();
    });

    it("passing label text as a ReactNode renders", () => {
      const { getByText } = render(
        <Button onPress={onPress} label={<Text>Node Text</Text>} />
      );

      expect(getByText("Node Text")).toBeTruthy();
    });

    it("loading prop true works as expected", () => {
      const { getByTestId } = render(
        <Button onPress={onPress} loading label="Base Button" />
      );

      const loader = getByTestId("line-loader");

      expect(isLineLoaderVisible(loader)).toBeTruthy();
    });

    it("loading prop false works as expected", () => {
      const { getByTestId } = render(
        <Button onPress={onPress} loading={false} label="Base Button" />
      );

      const loader = getByTestId("line-loader");

      expect(isLineLoaderVisible(loader)).toBe(false);
    });

    it("elevationLevel prop 3 works as expected", () => {
      const { getByTestId } = render(
        <Button
          onPress={onPress}
          disabled
          elevationLevel={3}
          label="Base Button"
        />
      );

      const style = getByTestId("button-container")?.props?.style;

      const hasShadow = findActiveStyle(style, "shadowColor");

      expect(hasShadow).toBeTruthy();
    });

    it("onPress prop works as expected", () => {
      const onPressSpy = jest.fn();

      const { getByLabelText } = render(
        <Button onPress={onPressSpy} label="Base Button" />
      );

      fireEvent.press(getByLabelText("Base Button"));

      expect(onPressSpy.mock.calls.length).toBe(1);
    });

    it("disabled prop true works as expected", () => {
      const onPressSpy = jest.fn();

      const { getByLabelText } = render(
        <Button onPress={onPressSpy} disabled label="Base Button" />
      );

      fireEvent.press(getByLabelText("Base Button"));

      expect(onPressSpy.mock.calls.length).toBe(0);
    });
  });
});
