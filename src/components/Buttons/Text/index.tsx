import React from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import { ReactNode } from "react";

import Typography, { ITypographyProps } from "src/components/Typography";
import { IColor, Color } from "@cohubinc/cohub-utils";
import { debug } from "src/constants/debug";
import Loader from "src/components/Loader";

interface ITextButtonProps extends TouchableOpacityProps {
  label: ReactNode;
  /**
   * @default true
   */
  loading?: boolean;
  /**
   * @default Color.iconGrey
   */
  color?: IColor;
  textStyle?: ITypographyProps["style"];
  fontSize?: number;
  disabled?: boolean;
}

export default function Text(props: ITextButtonProps) {
  const {
    label,
    color = Color.iconGrey,
    textStyle,
    loading,
    style,
    disabled,
    fontSize,
    ...restProps
  } = props;

  return (
    <TouchableOpacity
      {...restProps}
      style={[{ minHeight: 24, justifyContent: "center" }, style, debug]}
      disabled={disabled}
    >
      <Typography
        uppercase
        weight="500"
        style={[{ fontSize: 12 }, textStyle, { fontSize }]}
        color={disabled ? Color.grey600 : color}
      >
        {label}
      </Typography>
      <Loader.Line
        show={!!loading}
        color={color}
        style={{ position: "absolute", bottom: 0 }}
      />
    </TouchableOpacity>
  );
}
