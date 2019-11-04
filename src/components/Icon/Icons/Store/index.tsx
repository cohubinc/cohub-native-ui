import React from "react";
import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Rect, G, Path } from "react-native-svg";

const Store = (props: IProps) => (
  <IconWrapper {...props}>
    {({ size, color }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G id="Frame_-_24px">
          <Rect fill="none" width={size} height={size} />
        </G>
        <G id="Line_Icons">
          <G>
            <Path
              fill={color}
              d="M22.937,10.649l-3-8C19.79,2.259,19.417,2,19,2H5C4.583,2,4.21,2.259,4.063,2.649l-3,8  c-0.114,0.307-0.072,0.651,0.114,0.92C1.365,11.839,1.672,12,2,12h1v9c0,0.552,0.447,1,1,1h16c0.553,0,1-0.448,1-1v-9h1    c0.328,0,0.635-0.161,0.822-0.431C23.009,11.3,23.051,10.956,22.937,10.649z M20.557,10h-2.775l-1.5-6h2.025L20.557,10z M8.281,10    l1.5-6H11v6H8.281z M13,4h1.219l1.5,6H13V4z M5.693,4h2.025l-1.5,6H3.443L5.693,4z M14,20v-5h2v5H14z M19,20h-1v-6    c0-0.552-0.447-1-1-1h-4c-0.553,0-1,0.448-1,1v6H5v-8h14V20z"
            />
            <Path
              fill={color}
              d="M7,18h3c0.553,0,1-0.448,1-1v-3c0-0.552-0.447-1-1-1H7c-0.553,0-1,0.448-1,1v3  C6,17.552,6.447,18,7,18z"
            />
          </G>
        </G>
      </Svg>
    )}
  </IconWrapper>
);

export default Store;
