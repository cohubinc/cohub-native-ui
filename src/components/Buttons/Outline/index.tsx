import React, { forwardRef, Ref } from "react";
import { Color } from "@cohubinc/cohub-utils";

import TButtonProps from "src/definitions/interfaces/IButtonProps";
import BaseButton from "../Base";
import { TouchableOpacity } from "react-native";

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

const Outline = forwardRef(
  (props: IOutlineButtonProps, ref: Ref<TouchableOpacity>) => {
    const mergedProps = { ...defaultProps, ...props };

    const { style, bordered, dark, color, ...rest } = mergedProps;

    const backgroundColor = dark ? Color.black : Color.trueWhite;

    return (
      <BaseButton
        ref={ref}
        {...rest}
        style={[{ backgroundColor }, style]}
        labelStyle={{
          fontSize: 12,
          lineHeight: 14,
          color
        }}
        loaderColor={color}
        borderColor={color}
      />
    );
  }
);

export default Outline;
