import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const TripleDotsVertical = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M0,0h24v24h-24Z" fill="none" />
        <Path
          fill={color as any}
          d="M12,8c1.1,0 2,-0.9 2,-2c0,-1.1 -0.9,-2 -2,-2c-1.1,0 -2,0.9 -2,2c0,1.1 0.9,2 2,2Zm0,2c-1.1,0 -2,0.9 -2,2c0,1.1 0.9,2 2,2c1.1,0 2,-0.9 2,-2c0,-1.1 -0.9,-2 -2,-2Zm0,6c-1.1,0 -2,0.9 -2,2c0,1.1 0.9,2 2,2c1.1,0 2,-0.9 2,-2c0,-1.1 -0.9,-2 -2,-2Z"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default TripleDotsVertical;
