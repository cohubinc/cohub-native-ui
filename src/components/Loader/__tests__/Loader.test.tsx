import React from "react";
import { render } from "@testing-library/react-native";

import Loader from "../";
import { isLineLoaderVisible } from "src/helpers/test-utils";

describe("Loaders", () => {
  it(`It shows the circle-loader when show is TRUE`, () => {
    const { queryByTestId } = render(<Loader show={true} />);

    expect(!!queryByTestId("circle-loader")).toBe(true);
  });

  it(`It does NOT show the circle-loader when show is FALSE`, () => {
    const { queryByTestId } = render(<Loader show={false} />);
    expect(queryByTestId("circle-loader")).toBe(null);
  });

  it(`It shows the line-loader when show is TRUE`, async () => {
    const { getByTestId } = render(<Loader.Line show={true} />);
    const loader = getByTestId("line-loader");
    expect(isLineLoaderVisible(loader)).toBe(true);
  });

  it(`It does NOT show the line-loader when show is FALSE`, async () => {
    const { getByTestId } = render(<Loader.Line show={false} />);
    const loader = getByTestId("line-loader");
    expect(isLineLoaderVisible(loader)).toBe(false);
  });
});
