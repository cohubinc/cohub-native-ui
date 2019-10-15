import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const ChevronRight = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M10,6l-1.41,1.41l4.58,4.59l-4.58,4.59l1.41,1.41l6,-6Z"
          fill={color as any}
        />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default ChevronRight;
