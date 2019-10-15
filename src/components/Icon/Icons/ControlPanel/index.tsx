import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const ControlPanel = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15 2L15 22M4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22Z"
          stroke={color as any}
          strokeWidth="2"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default ControlPanel;
