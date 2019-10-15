import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import Svg, { Path } from "react-native-svg";

const Scales = (props: IProps) => (
  <IconWrapper {...props}>
    {({ color, size }) => (
      <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
        <Path
          d="M29.8563 15.6975L29.8688 15.6913L25.7725 7.5H27.5V5H16.25V2.5H13.75V5H2.5V7.5H4.2275L0.1325 15.6913L0.145 15.6975C0.05875 15.865 0 16.0487 0 16.25C0 19.6963 2.80375 22.5 6.25 22.5C9.69625 22.5 12.5 19.6963 12.5 16.25C12.5 16.0487 12.4412 15.865 12.3563 15.6975L12.3688 15.6913L8.2725 7.5H13.75V25H10V27.5H20V25H16.25V7.5H21.7275L17.6325 15.6913L17.645 15.6975C17.5588 15.865 17.5 16.0487 17.5 16.25C17.5 19.6963 20.3037 22.5 23.75 22.5C27.1963 22.5 30 19.6963 30 16.25C30 16.0487 29.9412 15.865 29.8563 15.6975ZM6.25 9.045L9.2275 15H3.2725L6.25 9.045ZM6.25 20C4.62 20 3.23 18.955 2.715 17.5H9.785C9.27 18.955 7.88 20 6.25 20ZM26.7275 15H20.7725L23.75 9.045L26.7275 15ZM23.75 20C22.12 20 20.73 18.955 20.215 17.5H27.285C26.77 18.955 25.38 20 23.75 20Z"
          fill={color as any}
        />
      </Svg>
    )}
  </IconWrapper>
);

export default Scales;
