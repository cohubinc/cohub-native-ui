import React from "react";
import { ITypographyProps } from "../definitions/ITypographyProps";

import Color from "src/definitions/enums/Color";
import { Text, StyleProp, TextStyle } from "react-native";

type TFactoryArgs = Omit<ITypographyProps, "children">;
// Function that takes some typography props and returns a Typography component
export function typographyFactory(defaultProps: TFactoryArgs) {
  return (props: ITypographyProps) => {
    const { style: factoryStyle } = defaultProps;
    const { children, style } = props;

    if (children === undefined || React.Children.count(children) === 0)
      return null;

    const mergedProperties = { ...defaultProps, ...props };
    const {
      fontFamily,
      muted,
      light,
      block,
      error,
      inverted,
      uppercase,
      alignment,
      weight,
      kerning,
      bold,
      mono,
      italicize,
      ...nativeProps
    } = mergedProperties;

    const fontWeight = bold ? "600" : weight || "400";

    let color: any = mergedProperties.color || Color.text;
    if (muted) {
      color = Color.lightText;
    } else if (light) {
      color = Color.trueWhite;
    } else if (inverted) {
      color = Color.invertedText;
    } else if (error) {
      color = Color.primaryRed;
    }

    const styleProp: Array<StyleProp<TextStyle>> = [
      factoryStyle,
      style,
      { fontWeight },
      { color }
    ];

    styleProp.push(fontFamily ? { fontFamily } : { fontFamily: "Inter" });

    styleProp.push(mono && { fontFamily: "Roboto Mono" });

    if (kerning) {
      styleProp.push({ letterSpacing: kerning * 16 }); // rems, yo
    }

    if (italicize) {
      styleProp.push({ fontStyle: "italic" });
    }

    if (uppercase) {
      styleProp.push({ textTransform: "uppercase" });
    }

    if (alignment) {
      styleProp.push({ textAlign: alignment });
    }

    if (block) {
      styleProp.push({ display: "flex" });
    }

    return (
      <Text {...nativeProps} style={styleProp}>
        {children}
      </Text>
    );
  };
}
