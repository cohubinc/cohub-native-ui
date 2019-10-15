import React from "react";

import IconWrapper from "../../IconWrapper/index";
import { IIconProps as IProps } from "../../index";
import guid from "src/helpers/guid";
import Svg, { Mask, Circle, G, EMaskUnits } from "react-native-svg";

const User = (props: IProps) => {
  const uniqueId = guid();

  return (
    <IconWrapper {...props}>
      {({ color, size }) => (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Mask
            id={uniqueId}
            mask-type="alpha"
            maskUnits={EMaskUnits.USER_SPACE_ON_USE}
            x="0"
            y="0"
            width={size}
            height={size}
          >
            <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="#F2F2F2" />
          </Mask>
          <G mask={`url(#${uniqueId})`}>
            <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="#F2F2F2" />
            <Circle
              cx={size / 2}
              cy={size / 1.0909090909}
              r={size / 3}
              fill="#C4C4C4"
            />
            <Circle
              cx={size / 2}
              cy={size / 2.6666666667}
              r={size / 6}
              fill="#C4C4C4"
            />
          </G>
        </Svg>
      )}
    </IconWrapper>
  );
};

export default User;
