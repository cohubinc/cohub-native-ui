import React from "react";
import { Linking, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Color, IColor } from "@cohubinc/cohub-utils";

import Typography, { ITypographyProps } from "src/components/Typography";

interface IProps extends ITypographyProps {
  href?: string;
  /** @default true */
  underlined?: boolean;
  typeFace?:
    | "SuperTitle"
    | "Title"
    | "Subtitle"
    | "HeadingLarge"
    | "HeadingSmall"
    | "HeadingTiny"
    | "Large"
    | "Small"
    | "Tiny";
}

export default function Link(props: IProps) {
  const {
    children,
    style,
    muted,
    href,
    onPress,
    underlined = true,
    fontFamily,
    typeFace,
    ...restOfProps
  } = props;

  const color: IColor = muted ? Color.darkGrey : Color.primaryGreen;

  const TypeFace = typeFace ? Typography[typeFace] : Typography;

  return (
    <TypeFace
      {...restOfProps}
      onPress={(e) => {
        onPress && onPress(e);

        if (href) {
          Linking.openURL(href).catch((err) =>
            console.log("An error occurred in Link", href, err)
          );
        }
      }}
      color={color}
      style={[
        underlined && {
          borderBottomWidth: 1,
          borderColor: color,
        },
        { alignSelf: "flex-start" },
        style,
      ]}
    >
      {children}
    </TypeFace>
  );
}
