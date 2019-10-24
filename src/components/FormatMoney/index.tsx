import React from "react";
import NumberFormat from "react-number-format";
import { Text } from "react-native";

export interface IFormatMoneyProps {
  value: string | number | null | undefined;
  /**
   * Use to extend decimal precision
   */
  extendedPrecision?: boolean;
}

export default function FormatMoney({
  value,
  extendedPrecision = true
}: IFormatMoneyProps) {
  const decimals = `${value}`.split(".")[1];

  return (
    <NumberFormat
      value={value || 0}
      displayType="text"
      prefix="$"
      thousandSeparator
      fixedDecimalScale
      decimalScale={
        extendedPrecision && decimals && decimals.length > 2
          ? decimals.length
          : 2
      }
      renderText={val => <Text>{val}</Text>}
    />
  );
}
