import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";

import { Color } from "@cohubinc/cohub-utils";

interface IProps {
  value?: string;
  textAlign?: "left" | "right" | "center";
  label?: string;
  style?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  color?: Color;
  backgroundColor?: Color;
  render: (textInputProp: TextInputProps) => any;
  error?: boolean;
  basic?: boolean;
}

export default function FloatingLabel({
  value,
  textAlign = "left",
  color = Color.darkGrey,
  backgroundColor = Color.black,
  label,
  error,
  basic,
  style,
  labelStyle,
  inputStyle,
  render,
}: IProps) {
  const animatedIsFocused = useRef(
    new Animated.Value(value?.length || 0 > 0 ? 1 : 0)
  ).current;

  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || (value?.length || 0 > 0) ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [internalValue]);

  const getLabelStyle = (): Animated.WithAnimatedObject<TextStyle> => {
    const sharedStyles: Animated.WithAnimatedObject<TextStyle> = {
      position: "absolute",
      backgroundColor: backgroundColor as string,
      paddingHorizontal: 5,
      top: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ["30%", "-20%"],
      }),
      fontSize: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [12, 10],
      }),
      color: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [color!, color!],
      }),
    };

    switch (textAlign) {
      case "left": {
        return { left: 5, ...sharedStyles };
      }
      case "right": {
        return { right: 5, ...sharedStyles };
      }
      case "center": {
        return { alignSelf: "center", ...sharedStyles };
      }
    }
  };

  return (
    <View
      style={
        !basic
          ? [
              styles.container,
              style,
              isFocused ? styles.active : {},
              error && styles.error,
            ]
          : undefined
      }
    >
      {!!label && !basic && (
        <Animated.Text
          style={[
            getLabelStyle(),
            { justifyContent: "center" },
            labelStyle,
            error && { color: Color.primaryRed },
          ]}
        >
          {label}
        </Animated.Text>
      )}
      {render({
        style: basic ? undefined : [styles.input, { textAlign }, inputStyle],
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        onChangeText: (val) => setInternalValue(val),
        value,
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Color.outlineGrey,
    borderRadius: 4,
    alignContent: "center",
    height: 40,
  },
  input: {
    height: "100%",
    color: Color.outlineGrey,
    justifyContent: "center",
    paddingVertical: 2,
  },
  active: {
    borderBottomColor: Color.primaryGreen,
    borderBottomWidth: 1,
  },
  error: {
    borderBottomColor: Color.primaryRed,
    borderBottomWidth: 1,
  },
});
