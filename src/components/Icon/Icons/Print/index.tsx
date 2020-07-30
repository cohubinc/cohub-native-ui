import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Print = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path
          d="M19,8h-14c-1.66,0 -3,1.34 -3,3v6h4v4h12v-4h4v-6c0,-1.66 -1.34,-3 -3,-3Zm-3,11h-8v-5h8v5Zm3,-7c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1Zm-1,-9h-12v4h12v-4Z"
          fill={color as any}
        />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default Print;
