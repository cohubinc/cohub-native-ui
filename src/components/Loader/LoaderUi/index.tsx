import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
  Easing
} from "react-native";
import { Color, IColor } from "@cohubinc/cohub-utils";

interface IProps {
  style?: StyleProp<ViewStyle>;
  size?: number;
  accessibilityLabel?: string;
  color: IColor;
}

export default class Loader extends React.Component<IProps> {
  solidPulse: Animated.Value;
  translucentPulse: Animated.Value;

  constructor(props: IProps) {
    super(props);

    this.solidPulse = new Animated.Value(0);
    this.translucentPulse = new Animated.Value(0);
  }

  componentDidMount() {
    this.showAnimation();
  }

  showAnimation = () => {
    const aniamtionConfig: Animated.TimingAnimationConfig = {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease)
    };

    Animated.parallel([
      Animated.loop(Animated.timing(this.solidPulse, aniamtionConfig)),
      Animated.loop(Animated.timing(this.translucentPulse, aniamtionConfig))
    ]).start();
  };

  render() {
    const {
      size = 40,
      style,
      accessibilityLabel = "circle",
      color
    } = this.props;
    const styles = makeStyles({ color });

    const circleStyle = { width: size, height: size, borderRadius: size / 2 };

    const solid = {
      transform: [
        {
          scale: this.solidPulse.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.6, 1]
          })
        }
      ]
    };

    const translucent = {
      transform: [
        {
          scale: this.translucentPulse.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [2, 1, 2]
          })
        }
      ]
    };

    return (
      <View testID="circle-loader" style={[styles.container, style]}>
        <Animated.View style={[circleStyle, styles.translucent, translucent]} />
        <Animated.View style={[circleStyle, styles.solid, solid]} />
      </View>
    );
  }
}

interface IStyleProps {
  color: IColor;
}

const makeStyles = ({ color }: IStyleProps) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      flex: 1,
      height: "100%"
    },
    solid: {
      position: "absolute",
      backgroundColor: color
    },
    translucent: {
      backgroundColor: color,
      opacity: 0.3
    }
  });
