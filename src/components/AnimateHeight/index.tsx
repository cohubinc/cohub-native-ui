import React, { SFC, useState, useRef, useEffect, Children } from "react";
import {
  ViewStyle,
  StyleProp,
  Animated,
  LayoutChangeEvent,
  View
} from "react-native";

interface IAnimateHeightProps {
  expanded: boolean;
  style?: StyleProp<ViewStyle>;
}
const AnimateHeight: SFC<IAnimateHeightProps> = props => {
  const { children, expanded, style } = props;

  const [elHeight, setElHeight] = useState<number | undefined>(undefined);

  const expandAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (elHeight === undefined) return;

    Animated.timing(expandAnimation, {
      toValue: expanded ? elHeight : 0
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

  return (
    <View
      style={[
        style,
        {
          opacity: elHeight === undefined ? 0 : 1,
          overflow: "hidden"
        }
      ]}
    >
      <Animated.View
        style={[
          { height: elHeight === undefined ? undefined : expandAnimation }
        ]}
        onLayout={getElHeightOnLayout}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default AnimateHeight;
