import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const ChevronLeft = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15.41,7.41l-1.41,-1.41l-6,6l6,6l1.41,-1.41l-4.58,-4.59Z"
          fill={color as any}
        />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default ChevronLeft;
