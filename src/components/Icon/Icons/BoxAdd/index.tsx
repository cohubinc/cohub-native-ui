import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const BoxAdd = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path d="M0,0h24v24h-24Z" fill="none" />
        <Path
          fill={color as any}
          d="M2,8.006h16v5.994h2v-6.994c0,-0.008 -0.004,-0.012 -0.004,-0.019c-0.002,-0.116 -0.026,-0.229 -0.068,-0.339c-0.011,-0.028 -0.025,-0.053 -0.039,-0.08c-0.019,-0.038 -0.031,-0.08 -0.057,-0.117l-4,-6c-0.186,-0.278 -0.498,-0.445 -0.832,-0.445h-10c-0.334,-5.20417e-18 -0.646,0.167 -0.832,0.445l-4,6c-0.025,0.037 -0.038,0.08 -0.057,0.117c-0.013,0.028 -0.028,0.052 -0.039,0.08c-0.042,0.11 -0.066,0.223 -0.068,0.339c-3.46945e-18,0.007 -0.004,0.012 -0.004,0.019v12c0,0.552 0.447,1 1,1h13v-2h-12v-10Zm15.131,-2h-6.131v-4h3.465l2.666,4Zm-11.596,-4h3.465v4h-6.131l2.666,-4Z"
        />
        <Path d="M24,19h-3v-3h-2v3h-3v2h3v3h2v-3h3Z" fill={color as any} />
      </Svg>
    )}
  </IconWrapper>
);

export default BoxAdd;
