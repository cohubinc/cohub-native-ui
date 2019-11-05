import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { IColor, Color, ContrastColor } from "@cohubinc/cohub-utils";

interface IProps {
  color?: IColor;
}

export default class SingleLoader extends React.Component<IProps> {
  animation: Animated.Value;

  static defaultProps: IProps = {
    color: Color.primary
  };

  constructor(props: IProps) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    this.showAnimation();
  }

  showAnimation = () => {
    Animated.loop(
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1)
      })
    ).start();
  };

  render() {
    const animated = {
      transform: [
        {
          scale: this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
          })
        }
      ]
    };

    const styles = StyleSheet.create({
      wrapper: {
        width: 30,
        height: 30,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center"
      },
      container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: this.props.color,
        borderRadius: 15
      },
      background: {
        backgroundColor: ContrastColor[this.props.color!]
      }
    });

    return (
      <View style={styles.wrapper}>
        <View style={[styles.container, styles.background]} />
        <Animated.View style={[styles.container, animated]} />
      </View>
    );
  }
}
