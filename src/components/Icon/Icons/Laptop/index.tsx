import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Laptop = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M0,0h24v24h-24Z" fill="none" />
        <Path
          fill={color as any}
          d="M20,18c1.1,0 1.99,-0.9 1.99,-2l0.01,-11c0,-1.1 -0.9,-2 -2,-2h-16c-1.1,0 -2,0.9 -2,2v11c0,1.1 0.9,2 2,2h-4c0,1.1 0.9,2 2,2h20c1.1,0 2,-0.9 2,-2h-4Zm-16,-13h16v11h-16v-11Zm8,14c-0.55,0 -1,-0.45 -1,-1c0,-0.55 0.45,-1 1,-1c0.55,0 1,0.45 1,1c0,0.55 -0.45,1 -1,1Z"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Laptop;
