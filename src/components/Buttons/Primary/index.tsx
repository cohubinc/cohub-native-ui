import React from "react";
import { StyleSheet, Animated, View, TouchableHighlight } from "react-native";
import styled from "styled-components/native";
import { Color, ContrastColor } from "@cohubinc/cohub-utils";

import Typography from "src/components/Typography";
import IButtonProps from "src/definitions/interfaces/IButtonProps";
import BasicButton from "../Base";

export default class Primary extends BasicButton {
  static defaultProps = {
    color: Color.primary,
    raised: true,
    animated: true,
    elevationLevel: 0,
    enableHaptics: false
  };

  render() {
    const { labelStyle, label, loading, elevationLevel } = this.props;

    const styles = makeStyles(this.props);

    const { style, ...restOfProps } = this.props;

    return (
      <TouchableHighlight
        onPressIn={this.beginPress}
        onPressOut={this.endPress}
        style={[{ height }, style, styles.disabledButton]}
        onLayout={this.onLayout}
        {...restOfProps}
      >
        <>
          <PulseView
            elevated={!!elevationLevel}
            style={[styles.button, this._pulseStyle]}
          >
            <Typography
              color={ContrastColor[this.props.color!]}
              style={[styles.label, labelStyle]}
            >
              {label}
            </Typography>
          </PulseView>
          {loading && (
            <View style={this._lineContainerStyle}>
              <Animated.View style={[this._lineStyle, { bottom: 0 }]} />
            </View>
          )}
        </>
      </TouchableHighlight>
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
      backgroundColor: p.color,
      borderRadius: 4,
      justifyContent: "center",
      width: "100%",
      flex: 1,
      alignItems: "center"
    },
    disabledButton: {
      opacity: p.disabled ? 0.3 : 1.0
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
