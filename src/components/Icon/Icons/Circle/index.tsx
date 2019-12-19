import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import { Color } from "@cohubinc/cohub-utils";
import Svg, { Circle as SvgCircle } from "react-native-svg";

const Circle = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
        <SvgCircle
          cx="12.5"
          cy="12.5"
          r="11.5"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Circle;
