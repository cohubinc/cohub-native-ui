import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Archive = (props: IIconProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20.54,5.23l-1.39,-1.68c-0.27,-0.34 -0.68,-0.55 -1.15,-0.55h-12c-0.47,0 -0.88,0.21 -1.16,0.55l-1.38,1.68c-0.29,0.34 -0.46,0.79 -0.46,1.27v12.5c0,1.1 0.9,2 2,2h14c1.1,0 2,-0.9 2,-2v-12.5c0,-0.48 -0.17,-0.93 -0.46,-1.27Zm-8.54,12.27l-5.5,-5.5h3.5v-2h4v2h3.5l-5.5,5.5Zm-6.88,-12.5l0.81,-1h12l0.94,1h-13.75Z"
          fill={color as any}
        />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default Archive;
