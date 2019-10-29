import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Circle } from "react-native-svg";

const CollectionDots = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Circle cx="4" cy="8" r="2" fill={color} />
        <Circle cx="4" cy="16" r="2" fill={color} />
        <Circle cx="12" cy="16" r="2" fill={color} />
        <Circle cx="12" cy="8" r="2" fill={color} />
        <Circle cx="20" cy="8" r="2" fill={color} />
      </Svg>
    )}
  </IconWrapper>
);

export default CollectionDots;
