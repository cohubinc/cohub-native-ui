import React from "react";
import NumberFormat from "react-number-format";

export interface IFormatNumberProps {
  value: string | number | null | undefined;
  thousandSeparator?: boolean;
}

export default function FormatNumber({
  value,
  thousandSeparator = true,
  ...rest
}: IFormatNumberProps) {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  return (
    <NumberFormat
      value={value || 0}
      thousandSeparator={thousandSeparator}
      displayType={"text"}
      {...rest}
    />
  );
}
