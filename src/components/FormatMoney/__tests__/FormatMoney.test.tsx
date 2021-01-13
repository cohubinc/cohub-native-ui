import React from "react";
import { render } from "@testing-library/react-native";
import FormatMoney from "src/components/FormatMoney";

describe("Format Money", () => {
  it("Formats correctly without a template passed", () => {
    const { getByText } = render(<FormatMoney value={1233.66} />);

    expect(getByText("$1,233.66")).toBeTruthy();
  });

  it("Formats correctly using shopifyCurrencyFormat for American dollars", () => {
    const { getByText } = render(
      <FormatMoney value={1233.66} shopifyCurrencyFormat="${{amount}}" />
    );

    expect(getByText("$1,233.66")).toBeTruthy();
  });

  it("Formats correctly using shopifyCurrencyFormat for euro's", () => {
    const { getByText } = render(
      <FormatMoney value={987.12345} shopifyCurrencyFormat="&euro;{{amount}}" />
    );

    expect(getByText("€987.12345")).toBeTruthy();
  });

  it("Formats correctly using shopifyCurrencyFormat for euro's - extendedPrecision false", () => {
    const { getByText } = render(
      <FormatMoney
        value={987.12345}
        shopifyCurrencyFormat="&euro;{{amount}}"
        extendedPrecision={false}
      />
    );

    expect(getByText("€987.12")).toBeTruthy();
  });
});
