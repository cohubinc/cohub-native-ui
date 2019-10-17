import React from "react";
import styled from "styled-components/native";

import Color from "src/definitions/enums/Color";

import { IIconProps } from "..";

interface IProps {
  children: (props: { color: Color; size: number }) => JSX.Element;
  color?: Color;
}

export type IWrapperProps = IProps & IIconProps;

export default function IconWrapper(props: IWrapperProps) {
  const {
    children,
    color = Color.grey500,
    size = 24,
    disabled,
    style,
    onPress,
    onLongPress,
    onPressOut
  } = props;

  const pressable = !!(onPress || onLongPress || onPressOut);

  const styledEl = (pressable
    ? styled.TouchableOpacity
    : styled.View) as typeof styled.TouchableOpacity;

  const IconWrapperContainer = styledEl`
    width: ${size};
    height: ${size};
    opacity: ${disabled ? 0.3 : 1};
    justify-content: center;
    align-items: center;
    opacity: ${disabled ? 0.3 : 1};
  `;

  const IconPositioner = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `;

  const btnProps = pressable
    ? {
        onPress,
        onLongPress,
        onPressOut,
        disabled
      }
    : {};

  return (
    <IconWrapperContainer style={[style]} {...btnProps}>
      <IconPositioner>{children({ color, size })}</IconPositioner>
    </IconWrapperContainer>
  );
}
