import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Count = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path
          fill={color as any}
          d="M4.80002 2.39999V21.6M9.60002 2.39999V21.6M14.4 2.39999V21.6M19.2 2.39999V21.6M2.40002 20.4L21.6 3.59999"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Count;
