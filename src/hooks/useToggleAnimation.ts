import { Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

interface IUseToggleAnimationOpts {
  outputRange?: number[] | string[];
  duration?: number;
  delay?: number;
}
export function useToggleAnimation(
  opts: IUseToggleAnimationOpts
): [Animated.AnimatedInterpolation, () => void] {
  const { outputRange = ["0deg", "-90deg"], duration = 300, delay } = opts;

  const [expanded, setExpanded] = useState(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 1 : 0,
      useNativeDriver: true,
      duration,
      delay
    }).start();
  }, [expanded]);

  const animation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange
  });

  const toggle = () => setExpanded(prev => !prev);

  return [animation, toggle];
}
