import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Columns = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M10,18h5v-13h-5v13Zm-6,0h5v-13h-5v13Zm12,-13v13h5v-13h-5Z"
          fill={color as any}
        />
        <path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default Columns;
