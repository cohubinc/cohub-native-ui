import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Sync = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => {
      return (
        <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
          <Path
            d="M18 6V1.5L12 7.5L18 13.5V9C22.965 9 27 13.035 27 18C27 19.515 26.625 20.955 25.95 22.2L28.14 24.39C29.31 22.545 30 20.355 30 18C30 11.37 24.63 6 18 6ZM18 27C13.035 27 9 22.965 9 18C9 16.485 9.375 15.045 10.05 13.8L7.86 11.61C6.69 13.455 6 15.645 6 18C6 24.63 11.37 30 18 30V34.5L24 28.5L18 22.5V27Z"
            fill={color}
          />
        </Svg>
      );
    }}
  </IconWrapper>
);

export default Sync;
