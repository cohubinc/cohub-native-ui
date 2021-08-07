import React, { SFC, useState, useRef, useEffect, Children } from "react";
import {
  ViewStyle,
  StyleProp,
  Animated,
  LayoutChangeEvent,
  View,
} from "react-native";

interface IAnimateHeightProps {
  expanded: boolean;
  style?: StyleProp<ViewStyle>;
  duration?: number;
}
const AnimateHeight: SFC<IAnimateHeightProps> = (props) => {
  const { children, expanded, style, duration } = props;

  const [elHeight, setElHeight] = useState<number | undefined>(undefined);

  const expandAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (elHeight === undefined) return;

    Animated.timing(expandAnimation, {
      toValue: expanded ? elHeight : 0,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  // This is just to get the UI in the correct state after we are able to calculate the element height
  // It should only run once, just after elHeight is set the first time
  useEffect(() => {
    if (elHeight === undefined) return;

    expandAnimation.setValue(expanded ? elHeight : 0);
  }, [elHeight === undefined]);

  function getElHeightOnLayout({ nativeEvent }: LayoutChangeEvent) {
    // Only get set the height once
    if (elHeight !== undefined) return;

    setElHeight(nativeEvent.layout.height);
  }
  if (!Children.count(children)) {
    return null;
  }

  type IStyle = {
    height?: number | Animated.Value;
  } & Pick<ViewStyle, "overflow" | "opacity">;
  let derivedStyle: IStyle = { height: expandAnimation, overflow: "hidden" };
  if (elHeight === undefined) {
    // If element height isn't calculated yet set opacity to 0 so we can get a measurement but without actually revealing the element
    derivedStyle.opacity = 0;
    // If element height isn't calculated yet don't set the height so we can measure it's 'natural' height first
    derivedStyle.height = undefined;
  }

  return (
    <View style={expanded ? style : undefined}>
      <Animated.View style={derivedStyle} onLayout={getElHeightOnLayout}>
        {children}
      </Animated.View>
    </View>
  );
};

export default AnimateHeight;
