import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Rows = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path d="M0,0h24v24h-24Z" fill="none" />
        <Path
          fill={color as any}
          d="M3,15h18v-2h-18v2Zm0,4h18v-2h-18v2Zm0,-8h18v-2h-18v2Zm0,-6v2h18v-2h-18Z"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Rows;
