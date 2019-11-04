import React from "react";
import { ContrastColor } from "src/definitions/enums/Color";
import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Circle, Path, Rect } from "react-native-svg";

const CirclePlus = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => {
      const bgColor = ContrastColor[color];
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="12" fill={color} />
          <Rect x="11" y="6" width="2" height="12" fill={bgColor} />
          <Rect
            x="6"
            y="13.0001"
            width="2"
            height="12"
            transform="rotate(-90 6 13.0001)"
            fill={bgColor}
          />
        </Svg>
      );
    }}
  </IconWrapper>
);

export default CirclePlus;
