import React, { forwardRef, Ref } from "react";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";
import { ReactNode } from "react";

import Typography, { ITypographyProps } from "src/components/Typography";
import { IColor, Color } from "@cohubinc/cohub-utils";
import Loader from "src/components/Loader";

export interface ITextButtonProps
  extends Omit<TouchableOpacityProps, "hitSlop"> {
  label: ReactNode;
  /**
   * @default true
   */
  loading?: boolean;
  /**
   * @default Color.iconGrey
   */
  color?: IColor;
  mono?: boolean;
  bold?: boolean;
  uppercase?: boolean;
  textProps?: Omit<ITypographyProps, "children">;
  fontSize?: number;
  disabled?: boolean;
  hitSlop?: number | TouchableOpacityProps["hitSlop"];
}

const Text = forwardRef(
  (props: ITextButtonProps, ref: Ref<TouchableOpacity>) => {
    const {
      label,
      color = Color.iconGrey,
      textProps,
      loading,
      style,
      disabled,
      fontSize = 12,
      hitSlop,
      mono,
      bold,
      uppercase,
      ...restProps
    } = props;

    let slop = props.hitSlop || 5;
    if (typeof slop === "number") {
      slop = { top: slop, left: slop, bottom: slop, right: slop };
    }

    return (
      <TouchableOpacity
        {...restProps}
        style={[{ minHeight: 24, justifyContent: "center" }, style]}
        disabled={disabled}
        hitSlop={slop}
      >
        <Typography
          {...textProps}
          uppercase={uppercase}
          bold={bold}
          weight="500"
          style={[{ fontSize: fontSize }, textProps?.style]}
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
);

export default Text;
