import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const TriangleDown = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 60 29" fill="none">
        <Path d="M30 29L60 -7.52509e-07H-8.6643e-07L30 29Z" fill={color} />
      </Svg>
    )}
  </IconWrapper>
);

export default TriangleDown;
