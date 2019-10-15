import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Add = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path d="M19,13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2Z" fill={color as any} />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default Add;
