import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path, G, Rect } from "react-native-svg";

const Menu = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Rect x="3" y="8" width="18" height="2" rx="1" fill={color} />
        <Rect x="3" y="14" width="12" height="2" rx="1" fill={color} />
      </Svg>
    )}
  </IconWrapper>
);

export default Menu;
