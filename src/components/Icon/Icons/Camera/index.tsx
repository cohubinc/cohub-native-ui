import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { G, Rect, Path } from "react-native-svg";

const Camera = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" x="0px" y="0px">
        <G id="Frame_-_24px">
          <Rect fill="none" width={size} height={size} />
        </G>
        <G id="Line_Icons">
          <G>
            <Path
              fill={color}
              d="M12,7.999c-2.757,0-5,2.243-5,5c0,2.758,2.243,5,5,5s5-2.242,5-5C17,10.241,14.757,7.999,12,7.999z     M12,15.999c-1.654,0-3-1.346-3-3c0-1.654,1.346-3,3-3s3,1.346,3,3C15,14.653,13.654,15.999,12,15.999z"
            />
            <Path
              fill={color}
              d="M20,5.999h-3.465l-1.406-2.109c-0.372-0.558-0.994-0.891-1.664-0.891h-2.93 c-0.67,0-1.292,0.333-1.664,0.891L7.465,5.999H4c-1.103,0-2,0.897-2,2v11c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2v-11    C22,6.896,21.103,5.999,20,5.999z M4,18.999v-11h4.535l2-3h2.93l2,3H20l0.001,11H4z"
            />
          </G>
        </G>
      </Svg>
    )}
  </IconWrapper>
);

export default Camera;
