import React from "react";
import Svg, { Path } from "react-native-svg";
import { Color } from "@cohubinc/cohub-utils";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";

const Triangle = (props: IProps) => (
  <IconWrapper {...props} color={Color.black}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 10 8">
        <Path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill={color as any} />
      </Svg>
    )}
  </IconWrapper>
);

export default Triangle;
