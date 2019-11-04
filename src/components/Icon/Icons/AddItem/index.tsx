import React from "react";
import Svg, { Path, G, Rect } from "react-native-svg";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";

const AddItem = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G opacity="0.9">
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 0H2C0.895431 0 0 0.89543 0 2V22C0 23.1046 0.89543 24 2 24H20C21.1046 24 22 23.1046 22 22V14H20V22H2L2 2H8V0Z"
            fill={color}
          />
          <Rect x="16" width="2" height="10" rx="1" fill={color} />
          <Rect
            x="22"
            y="4"
            width="1.99998"
            height="10"
            rx="0.99999"
            transform="rotate(90 22 4)"
            fill={color}
          />
        </G>
      </Svg>
    )}
  </IconWrapper>
);

export default AddItem;
