import React from "react";
import { Text, TextProps, Linking, TextInput, View } from "react-native";

import Color from "../../definitions/enums/Color";
import gs from "../../definitions/constants/GlobalStyles";

interface IProps extends TextProps {
  children: React.ReactNode;
  muted?: boolean;
  href?: string;
}

export default function Link({
  children,
  style,
  muted,
  href,
  onPress,
  ...restOfProps
}: IProps) {
  return (
    <View style={[style, {}]}>
      <TextInput
        {...restOfProps}
        editable={false}
        onTouchStart={e => {
          onPress && onPress(e);

          if (href) {
            Linking.openURL(href).catch(err =>
              console.log("An error occurred in Link", err)
            );
          }
        }}
        style={[
          style,
          gs.regularBodyText,
          {
            color: (muted ? Color.darkGrey : Color.primaryGreen) as any,
            borderBottomWidth: 1,
            borderColor: Color.primaryGreen as any,
            alignSelf: "flex-start"
          }
        ]}
      >
        {children}
      </TextInput>
    </View>
  );
}
