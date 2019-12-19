import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps } from "../../index";
import { Color } from "@cohubinc/cohub-utils";
import Svg, { Path } from "react-native-svg";

const ArrowDown = (props: IIconProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 8 11">
        <Path
          d="M3.86366 9.63634L3.51805 9.99766L3.86366 10.3282L4.20927 9.99766L3.86366 9.63634ZM0.381684 6.99766L3.51805 9.99766L4.20927 9.27502L1.07291 6.27502L0.381684 6.99766ZM4.20927 9.99766L7.34563 6.99766L6.65441 6.27502L3.51805 9.27502L4.20927 9.99766ZM4.36366 9.49998V0.772705H3.36366V9.49998H4.36366Z"
          fill={color as any}
        />
      </Svg>
    )}
  </IconWrapper>
);

export default ArrowDown;
