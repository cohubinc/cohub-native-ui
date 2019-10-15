import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Circle, Path } from "react-native-svg";

const CirclePlusInverted = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
        <Circle
          cx="9"
          cy="9"
          r="8.75"
          stroke={color as any}
          strokeWidth="0.5"
        />
        <Path
          d="M2.76904 9.00006H15.2306M8.99981 15.2308V2.76929"
          stroke={color as any}
          strokeWidth="0.5"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default CirclePlusInverted;
