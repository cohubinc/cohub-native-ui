import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Error = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M0,0h24v24h-24Z" fill="none" />
        <Path
          fill={color as any}
          d="M12,2c-5.52,0 -10,4.48 -10,10c0,5.52 4.48,10 10,10c5.52,0 10,-4.48 10,-10c0,-5.52 -4.48,-10 -10,-10Zm1,15h-2v-2h2v2Zm0,-4h-2v-6h2v6Z"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Error;
