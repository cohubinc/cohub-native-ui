import { Animated } from "react-native";
import { useState, useRef, useEffect } from "react";

interface IOpts {
  positionOne: number | string;
  positionTwo: number | string;
  duration?: number;
  delay?: number;
  useNativeDriver?: boolean;
}
type IStep = 1 | 2;
export function useTwoStepAnimation(
  opts: IOpts
): [Animated.AnimatedInterpolation, (position?: IStep) => void] {
  const {
    positionOne,
    positionTwo,
    duration = 200,
    delay,
    useNativeDriver = true
  } = opts;

  const [atSecondPosition, setAtSecondPosition] = useState(false);
  const stepAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(stepAnimation, {
      toValue: atSecondPosition ? 1 : 0,
      useNativeDriver,
      duration,
      delay
    }).start();
  }, [atSecondPosition, positionOne, positionTwo]);

  const animation = stepAnimation.interpolate({
    inputRange: [0, 1],
    // positionOne and positionTwo need to be the same type but could be
    // either a number or string. Not sure how to express that in typescript
    outputRange: [positionOne, positionTwo] as any
  });

  const setStepOrToggle = (position?: IStep) => {
    // toggle
    if (position === undefined)
      return setAtSecondPosition(lastSate => !lastSate);

    setAtSecondPosition(position === 2);
  };

  return [animation, setStepOrToggle];
}
