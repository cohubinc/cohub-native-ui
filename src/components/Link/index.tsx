import React from "react";
import { Linking, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Color } from "@cohubinc/cohub-utils";

import Typography, { ITypographyProps } from "src/components/Typography";

interface IProps extends Omit<TouchableOpacityProps, "hitSlop"> {
  children: React.ReactNode;
  muted?: boolean;
  href?: string;
  /** @default true */
  underlined?: boolean;
  hitSlop?: number | TouchableOpacityProps["hitSlop"];
  textStyle?: ITypographyProps["style"];
}

export default function Link(props: IProps) {
  const {
    children,
    style,
    muted,
    href,
    onPress,
    underlined = true,
    textStyle,
    ...restOfProps
  } = props;

  const color = (muted ? Color.darkGrey : Color.primaryGreen) as any;

  let hitSlop = props.hitSlop || 5;
  if (typeof hitSlop === "number") {
    hitSlop = { top: hitSlop, left: hitSlop, bottom: hitSlop, right: hitSlop };
  }

  return (
    <TouchableOpacity
      {...restOfProps}
      hitSlop={hitSlop}
      onPress={e => {
        onPress && onPress(e);

        if (href) {
          Linking.openURL(href).catch(err =>
            console.log("An error occurred in Link", href, err)
          );
        }
      }}
      style={[
        underlined && {
          borderBottomWidth: 1,
          borderColor: color
        },
        style
      ]}
    >
      <Typography color={color} style={textStyle}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
}
