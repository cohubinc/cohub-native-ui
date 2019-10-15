import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const CaretDown = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M7.41,7.84l4.59,4.58l4.59,-4.58l1.41,1.41l-6,6l-6,-6Z"
          fill={color as any}
        />
        <Path fill="none" d="M0,-0.75h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default CaretDown;
