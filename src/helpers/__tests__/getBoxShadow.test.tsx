import React from "react";
import { render } from "@testing-library/react-native";
import styled from "styled-components/native";
import BoxShadow, { ElevationLevel } from "src/definitions/enums/BoxShadow";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This test is just a mechanism for generating react native box shadow styles from css
// To see the boxshadows that are generated make the test fail by setting the showGeneratedStylesAsTestFailure variable, below, to true
const showGeneratedStylesAsTestFailure = false;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("Generate react native boxshadows from css BoxShadows", () => {
  type TElevationsList = Array<ElevationLevel>;
  const elevations: TElevationsList = [0, 1, 2, 3, 8, 16, 24];
  elevations.forEach(elevation => {
    it(`ElevationLevel ${elevation}`, () => {
      const Btn = styled.Button`
        box-shadow: ${(BoxShadow as any)[`dp${elevation}`]};
      `;

      const { getByTestId } = render(
        <Btn onPress={() => null} title="Start" testID="button" />
      );

      const style = getByTestId("button")?.props?.style;

      expect(style).toBe(showGeneratedStylesAsTestFailure ? elevation : style);
    });
  });
});
