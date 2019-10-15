import React from "react";
import Svg, { Path } from "react-native-svg";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";

const ArrowUp = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 8 11">
        <Path
          d="M4.13636 1.27271L4.48198 0.911384L4.13636 0.580799L3.79075 0.911384L4.13636 1.27271ZM7.61834 3.91138L4.48198 0.911384L3.79075 1.63403L6.92712 4.63403L7.61834 3.91138ZM3.79075 0.911384L0.654389 3.91138L1.34561 4.63403L4.48198 1.63403L3.79075 0.911384ZM3.63636 1.40907V10.1363H4.63636V1.40907H3.63636Z"
          fill={color as any}
        />
      </Svg>
    )}
  </IconWrapper>
);

export default ArrowUp;
