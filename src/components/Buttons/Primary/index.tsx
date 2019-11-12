import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View
} from "react-native";
import styled from "styled-components/native";

import Colors from "../../../definitions/enums/Color";
import gs from "../../../definitions/constants/GlobalStyles";
import BasicButton from "../Base";
import IButtonProps from "../../../definitions/interfaces/IButtonProps";

export default class Primary extends BasicButton {
  static defaultProps = {
    color: "#EFF7EE" as any,
    raised: true,
    animated: true,
    elevationLevel: 0
  };

  render() {
    const { labelStyle, label, loading, elevationLevel } = this.props;

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
        <PulseView
          elevated={!!elevationLevel}
          style={[styles.button, this._pulseStyle]}
        >
          <Text style={[gs.regularBodyText, styles.label, labelStyle]}>
            {label}
          </Text>
        </PulseView>
        {loading && (
          <View style={this._lineContainerStyle}>
            <Animated.View style={[this._lineStyle, { bottom: 0 }]} />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const PulseView = styled(Animated.View)<{ elevated: boolean }>`
  box-shadow: ${p => (p.elevated ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none")};
`;

const height = 40;

const makeStyles = (p: IButtonProps) =>
  StyleSheet.create({
    button: {
      height,
      paddingHorizontal: 15,
      backgroundColor: p.backgroundColor || (Colors.primaryGreen as any),
      borderRadius: 4,
      justifyContent: "center",
      width: "100%",
      opacity: p.disabled ? 0.3 : 1.0,
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
      textAlign: "center",
      color: p.color,
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
