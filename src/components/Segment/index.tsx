import React, { ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";
import styled from "styled-components/native";
import { Color } from "@cohubinc/cohub-utils";

import BoxShadow, { ElevationLevel } from "src/definitions/enums/BoxShadow";

export interface ISegmentProps {
  style?: StyleProp<ViewStyle>;
  /**
   * If true, the Segment will get 1rem of padding on all sides
   */
  padded?: boolean;
  /**
   * The level of drop shadow that shows beneath the segment
   */
  elevation?: ElevationLevel;
  /**
   * If true, the Segment will use the contrast background and have no elevation
   */
  children: ReactNode;
}

export default function Segment(props: ISegmentProps) {
  const { elevation = 1, padded = true, style, children, ...rest } = props;

  const dpLevel = `dp${elevation}`;

  const StyledSegment = styled.View`
    box-shadow: ${(BoxShadow as any)[dpLevel]};
    background-color: ${Color.trueWhite};
    padding: ${padded ? "16px" : 0};
    border-radius: 4;
    margin-left: 8;
    margin-right: 8;
  `;

  return (
    <StyledSegment style={style} {...rest}>
      {children}
    </StyledSegment>
  );
}
