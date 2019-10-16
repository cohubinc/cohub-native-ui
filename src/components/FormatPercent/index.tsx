import React from "react";
import NumberFormat from "react-number-format";
import { Text } from "react-native";

export interface IFormatPercentProps {
  value: number | string | null | undefined;
  shouldParse?: boolean;
}

export default function FormatPercent({
  value,
  shouldParse = true
}: IFormatPercentProps) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    value = shouldParse ? parseFloat(value) * 100 : parseFloat(value);
  }

  const percentValue = shouldParse ? value * 100 : value;

  return (
    <NumberFormat
      value={percentValue}
      displayType={"text"}
      thousandSeparator={true}
      decimalScale={2}
      suffix="%"
      renderText={value => <Text>{value}</Text>}
    />
  );
}
