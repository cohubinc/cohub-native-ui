import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Ellipsis = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M6.41422 10.5858C7.19527 11.3668 7.19527 12.6332 6.41422 13.4142C5.63317 14.1953 4.36684 14.1953 3.58579 13.4142C2.80474 12.6332 2.80474 11.3668 3.58579 10.5858C4.36684 9.80474 5.63317 9.80474 6.41422 10.5858Z"
          fill={color}
        />
        <Path
          d="M13.4142 10.5858C14.1953 11.3668 14.1953 12.6332 13.4142 13.4142C12.6332 14.1953 11.3668 14.1953 10.5858 13.4142C9.80474 12.6332 9.80474 11.3668 10.5858 10.5858C11.3668 9.80474 12.6332 9.80474 13.4142 10.5858Z"
          fill={color}
        />
        <Path
          d="M20.4142 10.5858C21.1953 11.3668 21.1953 12.6332 20.4142 13.4142C19.6332 14.1953 18.3668 14.1953 17.5858 13.4142C16.8047 12.6332 16.8047 11.3668 17.5858 10.5858C18.3668 9.80474 19.6332 9.80474 20.4142 10.5858Z"
          fill={color}
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Ellipsis;
