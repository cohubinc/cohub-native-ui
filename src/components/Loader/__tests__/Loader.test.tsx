import React from "react";
import { render } from "@testing-library/react-native";

import Loader from "../";

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
    const { findByTestId } = render(<Loader.Line show={true} />);
    const loader = await findByTestId("line-loader");
    expect(linLoaderIsVisible(loader)).toBe(true);
  });

  it(`It does NOT show the line-loader when show is FALSE`, async () => {
    const { findByTestId } = render(<Loader.Line show={false} />);
    const loader = await findByTestId("line-loader");
    expect(linLoaderIsVisible(loader)).toBe(false);
  });
});

function linLoaderIsVisible(loader: any) {
  return !(loader?.props?.style?.pop().opacity === 0);
}
