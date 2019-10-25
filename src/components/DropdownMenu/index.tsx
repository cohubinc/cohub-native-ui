import React, { ReactElement, useState, ReactNode, useEffect } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

import Color from "src/definitions/enums/Color";
import Font from "src/definitions/enums/Font";
import Typography from "src/components/Typography";
import Icon from "src/components/Icon";
import styled from "styled-components/native";
import { useToggleAnimation } from "src/hooks/useToggleAnimation";

interface IOption<V> {
  /**
   * @default value
   */
  label?: ReactElement;
  value: V;
}
interface IProps<Val> {
  label: ReactNode;
  options: Array<IOption<Val>>;
  onSelect: (val: Val) => void;
  value?: Val;
  style?: StyleProp<ViewStyle>;
  /**
   * @default Color.trueWhite
   */
  color?: Color;
  fontFamily?: Font;
  /**
   * @default Color.primary
   */
  backgroundColor?: Color;
  shrink?: true;
}
const Container = styled.View<{ backgroundColor: Color }>`
  padding: 0 5px;
  background-color: ${p => p.backgroundColor};
`;
const LabelRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default function DropdownMenu<Val>(props: IProps<Val>) {
  const {
    style,
    value,
    label,
    color = Color.trueWhite,
    backgroundColor = Color.primary,
    shrink = false
  } = props;
  const [localValue, setLocalValue] = useState(value);

  const [rotateAnimation, toggleRotateAnimation] = useToggleAnimation({
    outputRange: ["0deg", "-90deg"]
  });

  const [textScaleAnimation, toggleTextScaleAnimation] = useToggleAnimation({
    outputRange: [0.8, 1]
  });

  useEffect(() => {
    toggleTextScaleAnimation();
  }, [shrink]);

  return (
    <Animated.View
      backgroundColor={backgroundColor}
      style={[{ transform: [{ scale: textScaleAnimation }] }, style]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          toggleRotateAnimation();
        }}
      >
        <LabelRow>
          <Typography.HeadingSmall color={color} style={{ marginRight: 8 }}>
            {label}
          </Typography.HeadingSmall>

          <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
            <Icon.TriangleDown size={12} color={color} />
          </Animated.View>
        </LabelRow>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}
