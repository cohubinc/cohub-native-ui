import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const ChevronDown = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M7,10l5,5l5,-5Z" fill={color as any} />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default ChevronDown;
