import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path, G } from "react-native-svg";

const Flashlight = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <G transform="scale(0.046875)">
          <Path
            fill={color}
            d="M317,32h-122c-17.6,0 -24,14.4 -24,32h170c0,-17.6 -6.4,-32 -24,-32Zm-120.9,115.5c7.6,8.8 11.9,20 11.9,31.7v265.9c0,21.9 17.9,34.9 39.9,34.9h16.3c21.9,0 39.9,-12.9 39.9,-34.9v-265.9c0,-11.7 4.3,-22.8 11.9,-31.7c15.4,-17.9 25,-34.5 25,-67.5h-170c0,35 9.6,49.6 25.1,67.5Zm31.9,90.8c0,-15.6 12.6,-28.3 28,-28.3c15.4,0 28,12.7 28,28.3v35.4c0,15.6 -12.6,28.3 -28,28.3c-15.4,0 -28,-12.7 -28,-28.3v-35.4Z"
          />
          <Path
            fill={color}
            d="M270.142,258.858c7.81049,7.81049 7.81049,20.4738 0,28.2843c-7.81049,7.81049 -20.4738,7.81049 -28.2843,0c-7.81049,-7.81049 -7.81049,-20.4738 0,-28.2843c7.81049,-7.81049 20.4738,-7.81049 28.2843,0"
          />
        </G>
      </Svg>
    )}
  </IconWrapper>
);

export default Flashlight;
