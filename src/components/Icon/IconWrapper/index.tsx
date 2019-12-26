import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { IColor, Color } from "@cohubinc/cohub-utils";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { IIconProps } from "../";

interface IProps {
  children: (props: { color: IColor; size: number }) => JSX.Element;
  color?: IColor;
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
    onPressOut,
    enableHaptics = false
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

  if (pressable && !accessibilityLabel) {
    accessibilityLabel = props.name;
  }

  const btnProps = pressable
    ? {
        onPress,
        onLongPress,
        onPressOut,
        onPressIn: () => ReactNativeHapticFeedback.trigger("impactMedium", {}),
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
