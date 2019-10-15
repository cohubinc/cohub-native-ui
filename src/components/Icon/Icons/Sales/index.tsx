import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Sales = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M11.8,10.9c-2.27,-0.59 -3,-1.2 -3,-2.15c0,-1.09 1.01,-1.85 2.7,-1.85c1.78,0 2.44,0.85 2.5,2.1h2.21c-0.07,-1.72 -1.12,-3.3 -3.21,-3.81v-2.19h-3v2.16c-1.94,0.42 -3.5,1.68 -3.5,3.61c0,2.31 1.91,3.46 4.7,4.13c2.5,0.6 3,1.48 3,2.41c0,0.69 -0.49,1.79 -2.7,1.79c-2.06,0 -2.87,-0.92 -2.98,-2.1h-2.2c0.12,2.19 1.76,3.42 3.68,3.83v2.17h3v-2.15c1.95,-0.37 3.5,-1.5 3.5,-3.55c0,-2.84 -2.43,-3.81 -4.7,-4.4Z"
          fill={color as any}
        />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default Sales;
