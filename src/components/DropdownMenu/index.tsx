import React, { useState, useEffect, ReactNode } from "react";
import {
  StyleProp,
  ViewStyle,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { IColor } from "@cohubinc/cohub-utils";
import { Color } from "@cohubinc/cohub-utils";

import Font from "src/definitions/enums/Font";
import Typography from "src/components/Typography";
import Icon from "src/components/Icon";
import { useTwoStepAnimation } from "src/hooks/useTwoStepAnimation";
import AnimateHeight from "src/components/AnimateHeight";
import getBoxShadow from "src/helpers/getBoxShadow";

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
  color?: IColor;
  fontFamily?: Font;
  /**
   * @default Color.primary
   */
  backgroundColor?: IColor;
  shrink?: boolean;
  /**
   * @default false
   */
  bold?: boolean;
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
    shrink = false,
    bold,
  } = props;

  const [expanded, setExpanded] = useState(false);

  const [rotateAnimation, setRotateAnimation] = useTwoStepAnimation({
    positionOne: "-90deg",
    positionTwo: "0deg",
  });

  const [shrinkAnimation, setShrinkAnimation] = useTwoStepAnimation({
    positionOne: 1,
    positionTwo: 0.9,
  });

  useEffect(() => {
    setShrinkAnimation(shrink ? 2 : 1);
  }, [shrink]);

  useEffect(() => {
    setRotateAnimation(expanded ? 2 : 1);
  }, [expanded]);

  const selected = options.find((opt) => opt.value === value);

  const label = selected ? selected.label || selected.value : placeHolderLabel;

  // Remove selected item
  const filteredOpts = options.filter((opt) => opt.value !== value);

  return (
    <Wrapper style={[style]}>
      <Animated.View
        style={{ transform: [{ scale: shrinkAnimation }], backgroundColor }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <LabelRow backgroundColor={backgroundColor}>
            <Typography.HeadingSmall
              bold={bold}
              color={color}
              style={{ marginRight: 8 }}
              numberOfLines={1}
            >
              {label}
            </Typography.HeadingSmall>

            <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
              <Icon.TriangleDown size={8} color={color} />
            </Animated.View>
          </LabelRow>
        </TouchableWithoutFeedback>
      </Animated.View>

      <List expanded={expanded} style={[{ backgroundColor }, getBoxShadow(3)]}>
        {filteredOpts.map((opt) => (
          <ListItem key={opt.value as any} onPress={() => onSelect(opt.value)}>
            <Typography.Large color={color}>
              {opt.label || opt.value}
            </Typography.Large>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 100%;
`;
const borderRadius = "4px";
const List = styled(AnimateHeight)`
  border-bottom-left-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
`;
const LabelRow = styled.View<{ backgroundColor: IColor }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
  background-color: ${(p) => p.backgroundColor};
`;
const ListItem = styled.TouchableOpacity`
  padding: 5px 2px;
`;
