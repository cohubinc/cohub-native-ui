import React from "react";
import { Color, IColor } from "@cohubinc/cohub-utils";

import TButtonProps from "src/definitions/interfaces/IButtonProps";
import BaseButton from "../Base";

export interface IOutlineButtonProps extends TButtonProps {
  bordered?: boolean;
  dark?: boolean;
}

const defaultProps: Partial<IOutlineButtonProps> = {
  bordered: true,
  dark: false,
  color: Color.iconGrey,
  enableHaptics: false
};

export default function Outline(props: IOutlineButtonProps) {
  const mergedProps = { ...defaultProps, ...props };

  const { style, bordered, dark, color, ...rest } = mergedProps;

  const backgroundColor = dark ? Color.black : Color.trueWhite;

  return (
    <BaseButton
      {...rest}
      style={[{ backgroundColor }, style]}
      labelStyle={{
        fontSize: 12,
        lineHeight: 14,
        color: color
      }}
      loaderColor={color}
      borderColor={color}
    />
  );
}
