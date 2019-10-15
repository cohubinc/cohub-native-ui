import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const List = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path
          d="M3,13h2v-2h-2v2Zm0,4h2v-2h-2v2Zm0,-8h2v-2h-2v2Zm4,4h14v-2h-14v2Zm0,4h14v-2h-14v2Zm0,-10v2h14v-2h-14Z"
          fill={color as any}
        />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default List;
