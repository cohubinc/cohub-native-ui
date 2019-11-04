import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path, Rect, G } from "react-native-svg";

const ScanBarcode = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg x="0px" y="0px" width={size} height={size} viewBox="0 0 24 24">
        <G id="Frame_-_24px">
          <Rect fill="none" width={size} height={size} />
        </G>
        <G id="Line_Icons">
          <G>
            <Rect x="3" y="5" fill={color} width="2" height="14" />
            <Rect x="6" y="5" fill={color} width="2" height="10" />
            <Rect x="10" y="5" fill={color} width="2" height="10" />
            <Rect x="13" y="5" fill={color} width="2" height="10" />
            <Rect x="16" y="5" fill={color} width="2" height="10" />
            <Rect x="19" y="5" fill={color} width="2" height="14" />
            <Rect x="6" y="17" fill={color} width="2" height="2" />
            <Rect x="10" y="17" fill={color} width="2" height="2" />
            <Rect x="13" y="17" fill={color} width="2" height="2" />
            <Rect x="16" y="17" fill={color} width="2" height="2" />
            <Path fill={color} d="M2,3h2V1H1C0.447,1,0,1.448,0,2v3h2V3z" />
            <Path fill={color} d="M23,1h-3v2h2v2h2V2C24,1.448,23.553,1,23,1z" />
            <Path fill={color} d="M2,19H0v3c0,0.552,0.447,1,1,1h3v-2H2V19z" />
            <Path
              fill={color}
              d="M22,21h-2v2h3c0.553,0,1-0.448,1-1v-3h-2V21z"
            />
          </G>
        </G>
      </Svg>
    )}
  </IconWrapper>
);

export default ScanBarcode;
