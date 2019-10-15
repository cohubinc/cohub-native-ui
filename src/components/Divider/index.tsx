import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

import Colors from "../../definitions/enums/Color";

interface IProps {
  color?: Colors;
  style?: StyleProp<ViewStyle>;
}

export default function Divider({ style, color = Colors.grey }: IProps) {
  return (
    <View
      style={[
        {
          width: "100%",
          borderBottomWidth: 1,
          borderColor: color as any,
          marginVertical: 17
        },
        style
      ]}
    />
  );
}
