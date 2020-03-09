import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { IColor, Color } from "@cohubinc/cohub-utils";

export type TMargin = 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6;

interface IProps {
  color?: IColor;
  style?: StyleProp<ViewStyle>;
  marginSize?: TMargin;
  invisible?: boolean;
}

export default function Divider({
  style,
  color = Color.grey,
  marginSize = 1,
  invisible = false
}: IProps) {
  return (
    <View
      style={[
        {
          width: "100%",
          borderBottomWidth: invisible ? 0 : 1,
          borderColor: color as any,
          marginVertical: marginSize * 16
        },
        style
      ]}
    />
  );
}
