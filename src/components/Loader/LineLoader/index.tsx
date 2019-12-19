import React, { useState } from "react";
import { Animated, ViewStyle, StyleProp, View } from "react-native";

import { useRef, useEffect } from "react";
import { IColor, Color } from "@cohubinc/cohub-utils";

interface IProps {
  show: boolean;
  width?: number | string;
  style?: StyleProp<ViewStyle>;
  /**
   * The delay (in milliseconds) used when showing the animation
   */
  delay?: number;
  /**
   * @default Color.primary
   */
  color?: IColor;
}
export default function LineLoader(props: IProps) {
  const {
    show,
    style,
    width = "100%",
    delay = 0,
    color = Color.primary
  } = props;

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

  const thisShow = useRef(show);
  thisShow.current = show;

  useEffect(() => {
    function start() {
      setTimeout(() => {
        thisShow.current && loop.start();
      }, delay);
    }

    show ? start() : loop.stop();
  }, [show]);

  const [viewWidth, setViewWidth] = useState<number>(0);

  let animationStyle: null | { [style: string]: any } = {
    width: "50%",
    height: 4,
    backgroundColor: color,
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
      style={[{ width }, style, !show && { opacity: 0 }]}
      onLayout={e => {
        setViewWidth(e.nativeEvent.layout.width || 0);
      }}
    >
      <Animated.View style={animationStyle} />
    </View>
  );
}
