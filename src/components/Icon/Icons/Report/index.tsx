import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Report = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
        <Path
          d="M6.25 23.75V3.75H3.75V25C3.75 25.69 4.31 26.25 5 26.25H26.25V23.75H6.25Z"
          fill={color as any}
        />
        <Path
          d="M13.75 15.5175L16.6162 18.3825C17.105 18.8712 17.895 18.8712 18.3837 18.3825L25.8837 10.8825L24.1162 9.11499L17.5 15.7325L14.6337 12.8662C14.145 12.3775 13.355 12.3775 12.8662 12.8662L7.86621 17.8662L9.63371 19.6337L13.75 15.5175Z"
          fill={color as any}
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Report;
