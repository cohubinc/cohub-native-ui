import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Eye = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M0,0h24v24h-24Z" fill="none" />
        <Path
          fill={color as any}
          d="M12,4.5c-5,0 -9.27,3.11 -11,7.5c1.73,4.39 6,7.5 11,7.5c5,0 9.27,-3.11 11,-7.5c-1.73,-4.39 -6,-7.5 -11,-7.5Zm0,12.5c-2.76,0 -5,-2.24 -5,-5c0,-2.76 2.24,-5 5,-5c2.76,0 5,2.24 5,5c0,2.76 -2.24,5 -5,5Zm0,-8c-1.66,0 -3,1.34 -3,3c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3c0,-1.66 -1.34,-3 -3,-3Z"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Eye;
