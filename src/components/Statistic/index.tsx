import React from "react";
import Typography from "../Typography";
import FormatMoney from "../FormatMoney";
import FormatNumber from "../FormatNumber";
import FormatPercent from "../FormatPercent";
import Color from "../../definitions/enums/Color";
import styled from "styled-components/native";

type Value = number | string | undefined | null;
export interface IStatisticProps {
  size?: "small" | "regular" | "large" | "xlarge" | "huge";
  /**
   * The formatting that should be applied to the Statistics value
   */
  format: "money" | "number" | "percentage" | "text";
  label: string;
  value: Value;
  color?: Color;
  parsePercentage?: boolean;
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Statistic({
  size = "regular",
  format,
  label,
  value,
  color = Color.black500,
  parsePercentage = false
}: IStatisticProps) {
  const formattedValue = (val: Value) => {
    switch (format) {
      case "money":
        return <FormatMoney value={val} />;
      case "number":
        return <FormatNumber value={val} />;
      case "percentage":
        return <FormatPercent value={val} shouldParse={parsePercentage} />;
      case "text":
        return value;
      default:
        return <FormatNumber value={val} />;
    }
  };

  switch (size) {
    case "small":
      return (
        <Container>
          <Typography.Small color={color} weight={"400"}>
            {formattedValue(value)}
          </Typography.Small>
          <Typography.Tiny uppercase muted>
            {label}
          </Typography.Tiny>
        </Container>
      );
    case "regular":
      return (
        <Container>
          <Typography.Large color={color} weight={"500"}>
            {formattedValue(value)}
          </Typography.Large>
          <Typography.Small uppercase muted>
            {label}
          </Typography.Small>
        </Container>
      );
    case "large":
      return (
        <Container>
          <Typography.HeadingTiny color={color} weight={"500"}>
            {formattedValue(value)}
          </Typography.HeadingTiny>
          <Typography.Small uppercase muted>
            {label}
          </Typography.Small>
        </Container>
      );
    case "xlarge":
      return (
        <Container>
          <Typography.HeadingLarge weight={"600"} color={color}>
            {formattedValue(value)}
          </Typography.HeadingLarge>
          <Typography.Small uppercase muted>
            {label}
          </Typography.Small>
        </Container>
      );
    case "huge":
      return (
        <Container>
          <Typography.Subtitle weight={"600"} color={color}>
            {formattedValue(value)}
          </Typography.Subtitle>
          <Typography uppercase muted>
            {label}
          </Typography>
        </Container>
      );
    default:
      return (
        <Container>
          <Typography.Large color={color} weight={"600"}>
            {formattedValue(value)}
          </Typography.Large>
          <Typography.Small uppercase muted>
            {label}
          </Typography.Small>
        </Container>
      );
  }
}
