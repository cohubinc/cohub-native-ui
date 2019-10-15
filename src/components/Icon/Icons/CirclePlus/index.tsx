import React from "react";
import { ContrastColor } from "src/definitions/enums/Color";
import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Circle, Path } from "react-native-svg";

const CirclePlus = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
        <Circle cx="9" cy="9" r="9" fill={color as any} />
        <Path
          d="M2.76904 9.00006H15.2306M8.99981 15.2308V2.76929"
          stroke={ContrastColor[color] as any}
          strokeWidth="0.5"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default CirclePlus;
