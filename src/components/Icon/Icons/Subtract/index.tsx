import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Subtract = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => {
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M19 13H5V11H19V13Z" fill={color} />
        </Svg>
      );
    }}
  </IconWrapper>
);

export default Subtract;
