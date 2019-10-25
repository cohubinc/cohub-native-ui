import React, {
  ReactElement,
  useState,
  ReactNode,
  useEffect,
  useRef
} from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  Animated,
  TouchableWithoutFeedback,
  ScrollView
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
  shrink?: boolean;
}

export default function DropdownMenu<Val>(props: IProps<Val>) {
  const {
    style,
    value,
    label,
    options,
    color = Color.trueWhite,
    backgroundColor = Color.primary,
    shrink = false
  } = props;
  const [localValue, setLocalValue] = useState(value);

  const [rotateAnimation, toggleRotateAnimation] = useToggleAnimation({
    outputRange: ["-90deg", "0deg"]
  });

  const [shrinkAnimation, toggleShrinkAnimation] = useToggleAnimation({
    outputRange: [1, 0.9]
  });

  const [menuHeight, setMenuHeight] = useState(0);
  const expandedAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleShrinkAnimation(shrink);
  }, [shrink]);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log("use effect fire");
    Animated.spring(expandedAnimation, {
      toValue: open ? 0 : menuHeight
    }).start();
  }, [open]);

  const borderRadius = 4;

  return (
    <View style={[style]}>
      <Animated.View
        backgroundColor={backgroundColor}
        style={{ transform: [{ scale: shrinkAnimation }] }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setOpen(isOpen => !isOpen);
            toggleRotateAnimation();
          }}
        >
          <LabelRow>
            <Typography.HeadingSmall color={color} style={{ marginRight: 8 }}>
              {label}
            </Typography.HeadingSmall>

            <Animated.View style={{ transform: [{ rotate: rotateAnimation }] }}>
              <Icon.TriangleDown size={8} color={color} />
            </Animated.View>
          </LabelRow>
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View
        style={[
          { height: expandedAnimation },
          {
            paddingTop: 5,
            backgroundColor,
            borderColor: "black",
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius
          }
        ]}
      >
        <ScrollView>
          <View
            onLayout={({ nativeEvent }) =>
              setMenuHeight(nativeEvent.layout.height)
            }
          >
            {options.map(opt => (
              <ListItem key={opt.value as any}>
                <Typography.Large color={color}>
                  {opt.label || opt.value}
                </Typography.Large>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const LabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 2px;
`;

const ListItem = styled.View`
  padding: 5px 2px;
  /* border: 1px solid blue; */
`;
