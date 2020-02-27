import React, { ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";
import styled from "styled-components/native";
import { Color } from "@cohubinc/cohub-utils";

import { ElevationLevel } from "src/definitions/enums/BoxShadow";
import getBoxShadow from "src/helpers/getBoxShadow";

export interface ISegmentProps {
  style?: StyleProp<ViewStyle>;
  /**
   * If true, the Segment will get 1rem of padding on all sides
   * @default true
   */
  padded?: boolean;
  /**
   * The level of drop shadow that shows beneath the segment
   */
  elevation?: ElevationLevel;
  children: ReactNode;
}

export default function Segment(props: ISegmentProps) {
  const { elevation = 1, padded = true, style, children, ...rest } = props;

  const StyledSegment = styled.View`
    background-color: ${Color.trueWhite};
    padding: ${padded ? "16px" : 0};
    border-radius: 4;
    margin-left: 8;
    margin-right: 8;
  `;

  return (
    <StyledSegment style={[style, getBoxShadow(elevation)]} {...rest}>
      {children}
    </StyledSegment>
  );
}
