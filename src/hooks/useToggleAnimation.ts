import { Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

type IPosition = number | string;
interface IUseToggleAnimationOpts {
  /**
   * Position one length. (`from` and `to` must use the same length units)
   * ex: "0deg"
   */
  from: IPosition;
  /**
   * Position two length. (`from` and `to` must use the same length units)
   * ex: "180deg"
   */
  to: IPosition;
  duration?: number;
  delay?: number;
  useNativeDriver?: boolean;
}
export function useToggleAnimation(
  opts: IUseToggleAnimationOpts
): [Animated.AnimatedInterpolation, (state?: boolean) => void] {
  const { from, to, duration = 300, delay, useNativeDriver = true } = opts;

  const [atSecondPosition, setAtSecondPosition] = useState(false);
  const stepAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(stepAnimation, {
      toValue: atSecondPosition ? 1 : 0,
      useNativeDriver,
      duration,
      delay
    }).start();
  }, [atSecondPosition, from, to]);

  const animation = stepAnimation.interpolate({
    inputRange: [0, 1],
    // from and to need to be the same type but could be either a number or string
    // not sure how to express that in typescript
    outputRange: [from, to] as IInexpressible
  });

  const toggleOrSet = (nextState?: boolean) => {
    // toggle
    if (nextState === undefined)
      return setAtSecondPosition(lastSate => !lastSate);

    setAtSecondPosition(nextState);
  };

  return [animation, toggleOrSet];
}
