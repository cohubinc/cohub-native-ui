import React, { useState } from "react";
import { Animated, ViewStyle, StyleProp, View } from "react-native";

import { useRef, useEffect } from "react";

interface IProps {
  show: boolean;
  width?: number | string;
  style?: StyleProp<ViewStyle>;
}
export default function LineLoader({ show, style, width }: IProps) {
  const animation = useRef(new Animated.Value(0)).current;
  const loop = useRef(
    Animated.loop(
      Animated.timing(animation, {
        toValue: 100,
        duration: 4000,
        useNativeDriver: true
      })
    )
  ).current;
  useEffect(() => {
    show ? loop.start() : loop.stop();
  }, [show]);
  const [viewWidth, setViewWidth] = useState<number>(0);

  let animationStyle: null | { [style: string]: any } = {
    width: "50%",
    height: 4,
    backgroundColor: "#63B05A",
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 10, 30, 40, 60, 100],
          outputRange: [-0.5, 1.0, 1.5, 1.0, -0.5, -0.5].map(
            val => val * viewWidth * 0.5
          )
        })
      },
      {
        scaleX: animation.interpolate({
          inputRange: [0, 10, 30, 40, 60, 100],
          outputRange: [0, 1.0, 0, 1.0, 0, 0]
        })
      }
    ]
  };

  if (!show) {
    animationStyle = null;
  }

  return (
    <View
      testID="line-loader"
      style={[{ width: width || "100%" }, style, !show && { opacity: 0 }]}
      onLayout={e => {
        setViewWidth(e.nativeEvent.layout.width || 0);
      }}
    >
      <Animated.View style={animationStyle} />
    </View>
  );
}
