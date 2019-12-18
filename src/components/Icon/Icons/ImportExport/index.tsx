import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const ImportExport = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <Path
          d="M13.5 4.5L7.5 10.485H12V21H15V10.485H19.5L13.5 4.5ZM24 25.515V15H21V25.515H16.5L22.5 31.5L28.5 25.515H24Z"
          fill={color}
        />
      </Svg>
    )}
  </IconWrapper>
);

export default ImportExport;
