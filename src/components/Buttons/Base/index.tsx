import React from "react";
import {
  Text,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle
} from "react-native";
import IButtonProps from "../../../definitions/interfaces/IButtonProps";
import Colors from "../../../definitions/enums/Color";
import gs from "../../../definitions/constants/GlobalStyles";
import Color from "../../../definitions/enums/Color";

export { IButtonProps };

export default abstract class Basic<T = {}> extends React.Component<
  IButtonProps<T>
> {
  // Animation to enlarge the container
  _pulseAnimation: Animated.Value;
  _pulseStyle: any;

  // Animation to draw a loader under the text content
  _lineAnimation: Animated.Value;
  _lineStyle: any;
  _lineContainerStyle: StyleProp<ViewStyle>;

  static defaultProps = {
    animated: true,
    color: Colors.black
  };

  constructor(props: IButtonProps<T>) {
    super(props);

    this._pulseAnimation = new Animated.Value(0);
    this._pulseStyle = props.animated
      ? {
          transform: [
            {
              scale: this._pulseAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.08]
              })
            }
          ]
        }
      : null;

    this._lineAnimation = new Animated.Value(0);
    this._lineStyle = null;
    this._lineContainerStyle = {
      overflow: "hidden",
      width: "100%",
      height: 4,
      bottom: 0,
      position: "absolute"
    };
  }

  componentDidMount() {
    if (this.props.loading) {
      const loop = Animated.loop(
        Animated.timing(this._lineAnimation, {
          toValue: 100,
          duration: 4000,
          useNativeDriver: true
        })
      );

      loop.start();
    }
  }

  componentDidUpdate(prevProps: IButtonProps<T>) {
    const loop = Animated.loop(
      Animated.timing(this._lineAnimation, {
        toValue: 100,
        duration: 4000,
        useNativeDriver: true
      })
    );

    if (!prevProps.loading && this.props.loading) {
      loop.start();
    }

    if (prevProps.loading && !this.props.loading) {
      loop.stop();
    }
  }

  beginPress = () => {
    Animated.timing(this._pulseAnimation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  endPress = () => {
    Animated.timing(this._pulseAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  onLayout = (event: LayoutChangeEvent) => {
    const { animated, color } = this.props;

    const width = event.nativeEvent.layout.width;

    this._lineStyle = animated
      ? {
          left: 0,
          width: "50%",
          height: 4,
          bottom: 0,
          position: "absolute",
          borderRadius: 4,
          backgroundColor: Color.primary || color,
          transform: [
            {
              translateX: this._lineAnimation.interpolate({
                inputRange: [0, 10, 30, 40, 60, 100],
                outputRange: [-0.5, 1.0, 1.5, 1.0, -0.5, -0.5].map(
                  val => val * width * 0.5
                )
              })
            },
            {
              scaleX: this._lineAnimation.interpolate({
                inputRange: [0, 10, 30, 40, 60, 100],
                outputRange: [0, 1.0, 0, 1.0, 0, 0]
              })
            }
          ]
        }
      : null;

    this.forceUpdate();
  };

  render() {
    const { labelStyle, label } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={this.beginPress}
        onPressOut={this.endPress}
        onLayout={this.onLayout}
        {...this.props}
      >
        <Animated.View style={[this.props.style, this._pulseStyle]}>
          <Text style={[gs.regularBodyText, labelStyle]}>{label}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
