import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View
} from "react-native";

import Colors from "../../../definitions/enums/Color";
import gs from "../../../definitions/constants/GlobalStyles";
import { generateBoxShadow } from "../shared-styles";
import BasicButton from "../Base";
import IButtonProps from "../../../definitions/interfaces/IButtonProps";

export default class Primary extends BasicButton {
  static defaultProps: any = {
    color: Colors.primaryGreen,
    raised: true,
    animated: true
  };

  render() {
    const {
      color,
      labelStyle,
      label,
      loading,
      highShadowContrast
    } = this.props;
    const styles = makeStyles(this.props);

    const { style, ...restOfProps } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={this.beginPress}
        onPressOut={this.endPress}
        style={[{ height }, style]}
        onLayout={this.onLayout}
        {...restOfProps}
      >
        <Animated.View
          style={[
            styles.button,
            // generateBoxShadow(this.props, {
            //   highContrast:
            //     highShadowContrast === undefined
            //       ? color === Colors.primaryGreen
            //       : highShadowContrast
            // }),
            this._pulseStyle
          ]}
        >
          <Text style={[gs.regularBodyText, styles.label, labelStyle]}>
            {label}
          </Text>
        </Animated.View>
        {loading && (
          <View style={this._lineContainerStyle}>
            <Animated.View style={[this._lineStyle, { bottom: 0 }]} />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const height = 40;

const makeStyles = (props: IButtonProps) =>
  StyleSheet.create({
    button: {
      height,
      paddingHorizontal: 15,
      backgroundColor: Colors.primaryGreen as any,
      borderRadius: 4,
      justifyContent: "center",
      width: "100%",
      opacity: props.disabled ? 0.3 : 1.0,
      flex: 1,
      alignItems: "center"
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      alignContent: "center",
      flex: 1
    },
    label: {
      // fontFamily: "Akkurat-Mono",
      textAlign: "center",
      color: "#EFF7EE",
      marginTop: 4
    },
    loader: {
      width: 50,
      height: 50,
      alignContent: "center",
      justifyContent: "center",
      alignSelf: "center"
    }
  });
