import React from "react";
import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Calendar = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg viewBox="0 0 512 512" width={size} height={size}>
        <Path
          fill={color as any}
          d="M368.005 272h-96v96h96v-96zm-32-208v32h-160V64h-48v32h-24.01c-22.002 0-40 17.998-40 40v272c0 22.002 17.998 40 40 40h304.01c22.002 0 40-17.998 40-40V136c0-22.002-17.998-40-40-40h-24V64h-48zm72 344h-304.01V196h304.01v212z"
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Calendar;
