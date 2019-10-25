import { Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

interface IUseToggleAnimationOpts {
  outputRange?: number[] | string[];
  duration?: number;
  delay?: number;
}
export function useToggleAnimation(
  opts: IUseToggleAnimationOpts
): [Animated.AnimatedInterpolation, (state?: boolean) => void] {
  const { outputRange = ["0deg", "-90deg"], duration = 300, delay } = opts;

  const [atStepTwo, setAtStepTwo] = useState(false);
  const stepAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(stepAnimation, {
      toValue: atStepTwo ? 1 : 0,
      useNativeDriver: true,
      duration,
      delay
    }).start();
  }, [atStepTwo]);

  const animation = stepAnimation.interpolate({
    inputRange: [0, 1],
    outputRange
  });

  const toggleOrSet = (nextState?: boolean) => {
    // toggle
    if (nextState === undefined) return setAtStepTwo(lastSate => !lastSate);

    setAtStepTwo(nextState);
  };

  return [animation, toggleOrSet];
}
