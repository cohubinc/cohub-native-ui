import React, { useState, useEffect, ReactNode } from "react";
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
import BoxShadow from "src/definitions/enums/BoxShadow";
import AnimateHeight from "src/components/AnimateHeight";

interface IOption<V> {
  /**
   * @default value
   */
  label?: ReactNode;
  value: V;
}
interface IProps<Val> {
  placeHolderLabel: ReactNode;
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
  shrink?: boolean;
}

export default function DropdownMenu<Val>(props: IProps<Val>) {
  const {
    style,
    value,
    placeHolderLabel,
    options,
    onSelect,
    color = Color.trueWhite,
    backgroundColor = Color.primary,
    shrink = false
  } = props;

  const [expanded, setExpanded] = useState(false);

  const [rotateAnimation, setRotateAnimation] = useToggleAnimation({
    from: "-90deg",
    to: "0deg"
  });

  const [shrinkAnimation, setShrinkAnimation] = useToggleAnimation({
    from: 1,
    to: 0.9
  });

  useEffect(() => {
    setShrinkAnimation(shrink);
  }, [shrink]);

  useEffect(() => {
    setRotateAnimation(expanded);
  }, [expanded]);

  const selected = options.find(opt => opt.value === value);

  const label = selected ? selected.label || selected.value : placeHolderLabel;

  // Remove selected item
  const filteredOpts = options.filter(opt => opt.value !== value);

  return (
    <Wrapper style={[style]}>
      <Animated.View
        backgroundColor={backgroundColor}
        style={{ transform: [{ scale: shrinkAnimation }] }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <LabelRow backgroundColor={backgroundColor}>
            <Typography.HeadingSmall color={color} style={{ marginRight: 8 }}>
              {label}
            </Typography.HeadingSmall>

            <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
              <Icon.TriangleDown size={8} color={color} />
            </Animated.View>
          </LabelRow>
        </TouchableWithoutFeedback>
      </Animated.View>

      <AnimateHeight expanded={expanded}>
        <List backgroundColor={backgroundColor}>
          {filteredOpts.map(opt => (
            <ListItem
              key={opt.value as any}
              onPress={() => onSelect(opt.value)}
            >
              <Typography.Large color={color}>
                {opt.label || opt.value}
              </Typography.Large>
            </ListItem>
          ))}
        </List>
      </AnimateHeight>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 100%;
`;
const borderRadius = "4px";
const List = styled.View<{ backgroundColor: Color }>`
  border-bottom-left-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
  background-color: ${p => p.backgroundColor};
  box-shadow: ${BoxShadow.dp3};
`;
const LabelRow = styled.View<{ backgroundColor: Color }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
  background-color: ${p => p.backgroundColor};
`;
const ListItem = styled.TouchableOpacity`
  padding: 5px 2px;
`;
