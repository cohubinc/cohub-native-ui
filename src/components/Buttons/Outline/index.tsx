import React from "react";
import { Color, IColor } from "@cohubinc/cohub-utils";

import TButtonProps from "src/definitions/interfaces/IButtonProps";
import BaseButton from "../Base";

const defaultHeight = 40;

export interface IOutlineButtonProps extends TButtonProps {
  bordered?: boolean;
  dark?: boolean;
  textColor?: IColor;
  outlineColor?: IColor;
}

const defaultProps: Partial<IOutlineButtonProps> = {
  bordered: true,
  dark: false,
  backgroundColor: Color.trueWhite,
  color: Color.iconGrey,
  enableHaptics: false
};

export default function Outline(props: IOutlineButtonProps) {
  const mergedProps = { ...defaultProps, ...props };

  const {
    style,
    bordered,
    dark,
    outlineColor,
    color,
    textColor,
    ...rest
  } = mergedProps;

  const backgroundColor = dark ? Color.black : mergedProps.backgroundColor;

  return (
    <BaseButton
      {...rest}
      style={[
        {
          backgroundColor,
          height: defaultHeight
        },
        style
      ]}
      labelStyle={{
        fontSize: 12,
        lineHeight: 14,
        color: (textColor || color) as any
      }}
      loaderColor={color}
      borderColor={(outlineColor || color) as any}
    />
  );
}
