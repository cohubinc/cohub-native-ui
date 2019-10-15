import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Search = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15.5,14h-0.79l-0.28,-0.27c0.98,-1.14 1.57,-2.62 1.57,-4.23c0,-3.59 -2.91,-6.5 -6.5,-6.5c-3.59,0 -6.5,2.91 -6.5,6.5c0,3.59 2.91,6.5 6.5,6.5c1.61,0 3.09,-0.59 4.23,-1.57l0.27,0.28v0.79l5,4.99l1.49,-1.49l-4.99,-5Zm-6,0c-2.49,0 -4.5,-2.01 -4.5,-4.5c0,-2.49 2.01,-4.5 4.5,-4.5c2.49,0 4.5,2.01 4.5,4.5c0,2.49 -2.01,4.5 -4.5,4.5Z"
          fill={color as any}
        />
        <Path fill="none" d="M0,0h24v24h-24Z" />
      </Svg>
    )}
  </IconWrapper>
);

export default Search;
