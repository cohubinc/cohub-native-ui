import React from "react";
import styled from "styled-components/native";

import Color from "src/definitions/enums/Color";

import { IIconProps } from "..";
import { TouchableOpacity, View } from "react-native";

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

  let { accessibilityLabel } = props;

  const pressable = !!(onPress || onLongPress || onPressOut);

  const Container = pressable ? TouchableOpacity : View;

  const IconWrapperContainer = styled(Container)`
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

  if (onPress || (onLongPress && !accessibilityLabel)) {
    accessibilityLabel = `${props.name} button`;
  }

  const btnProps = pressable
    ? {
        onPress,
        onLongPress,
        onPressOut,
        disabled
      }
    : {};

  let hitSlop = props.hitSlop || 20;
  if (typeof hitSlop === "number") {
    hitSlop = { top: hitSlop, left: hitSlop, bottom: hitSlop, right: hitSlop };
  }

  return (
    <IconWrapperContainer
      {...{ style, accessibilityLabel, hitSlop, ...btnProps }}
    >
      <IconPositioner>{children({ color, size })}</IconPositioner>
    </IconWrapperContainer>
  );
}
