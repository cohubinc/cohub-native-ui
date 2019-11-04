import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Mask, Circle, G, Ellipse, Defs, Use } from "react-native-svg";

const User = (props: IProps) => (
  <IconWrapper {...props}>
    {({ size, color }) => (
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
      >
        <Defs>
          <Mask
            id="mask0"
            maskUnits={"userSpaceOnUse" as any}
            x="0"
            y="0"
            width={size}
            height={size}
          >
            <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="white" />
          </Mask>

          <G id="G">
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2}
              stroke={color}
              strokeWidth={(size / 20) * 2}
            />
            <Ellipse
              cx={size / 2}
              cy={size * 0.916665}
              rx={size * 0.3333333333}
              ry={size * 0.3333333333}
              fill={color}
            />
            <Ellipse
              cx={size / 2}
              cy={size * 0.375}
              rx={size * 0.1666666666}
              ry={size * 0.1666666666}
              fill={color}
            />
          </G>
        </Defs>
        <Use mask="url(#mask0)" href="#G" />
      </Svg>
    )}
  </IconWrapper>
);

export default User;
