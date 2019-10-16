import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

import Colors from "../../definitions/enums/Color";

export type TMargin = 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6;

interface IProps {
  color?: Colors;
  style?: StyleProp<ViewStyle>;
  marginSize?: TMargin;
  invisible?: boolean;
}

export default function Divider({
  style,
  color = Colors.grey,
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
