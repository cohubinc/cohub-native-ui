import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Rect, Circle, Path } from "react-native-svg";

const CircleCheck = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 6 6" fill="none">
        <Rect width="6" height="6" fill="black" fillOpacity="0" />
        <Circle
          cx="3"
          cy="3"
          r="2.875"
          stroke={color as any}
          strokeWidth="0.25"
        />
        <Rect
          width="3"
          height="2.04523"
          fill={color as any}
          fillOpacity="0"
          transform="translate(1.5 1.875)"
        />
        <Path
          d="M1.5 2.89243L2.52262 3.91504L4.5 1.875"
          stroke={color as any}
          strokeWidth="0.25"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default CircleCheck;
