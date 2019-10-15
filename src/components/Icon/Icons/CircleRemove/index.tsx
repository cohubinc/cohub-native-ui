import React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";

const CircleRemove = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 6 6">
        <Rect width="6" height="6" fill={color as any} fillOpacity="0" />
        <Circle
          cx="3"
          cy="3"
          r="2.875"
          stroke={color as any}
          strokeWidth="0.25"
        />
        <Path
          d="M1.5314 4.46859L4.46862 1.53138M4.46862 4.46858L1.5314 1.53137"
          stroke={color as any}
          strokeWidth="0.25"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default CircleRemove;
