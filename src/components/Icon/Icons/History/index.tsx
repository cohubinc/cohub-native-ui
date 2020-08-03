import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path, Rect } from "react-native-svg";

const History = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Rect width="24" height="24" fill="none" />
        <Path
          fill={color as any}
          d="M18 10v-5.414l-4.586-4.586h-11.414c-1.103 0-2 .898-2 2v18c0 1.103.897 2 2 2h9.079c-.682-1.177-1.079-2.541-1.079-4 0-4.418 3.582-8 8-8Zm-6-9l5 5h-5v-5Zm-9 8h9v2h-9v-2Zm6 6h-6v-2h6v2Z"
        />
        <Path
          d="M18 11.984c-3.309 0-6 2.692-6 6 0 3.308 2.691 6 6 6 3.309 0 6-2.692 6-6 0-3.308-2.691-6-6-6Zm3 7h-4v-5h2v3h2v2Z"
          fill={color as any}
        />
      </Svg>
    )}
  </IconWrapper>
);

export default History;
