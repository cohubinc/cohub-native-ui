import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View
} from "react-native";

import gs from "src/definitions/constants/GlobalStyles";
import Colors from "src/definitions/enums/Color";
import TButtonProps from "src/definitions/interfaces/IButtonProps";
import { IColor } from "@cohubinc/cohub-utils";

import BasicButton from "../Base";
import styled from "styled-components/native";

const defaultHeight = 40;

export interface IProps extends TButtonProps {
  bordered?: boolean;
  dark?: boolean;
  raised?: boolean;
  textColor?: IColor;
  outlineColor?: IColor;
  elevationLevel: 0 | 3;
}

export default class Outline extends BasicButton<IProps> {
  static defaultProps = {
    bordered: true,
    dark: false,
    raised: true,
    backgroundColor: Colors.trueWhite,
    color: Colors.iconGrey,
    animated: true
  };

  render() {
    const {
      bordered,
      dark,
      color,
      style,
      elevationLevel,
      ...restOfProps
    } = this.props;
    const styles = makeStyles(this.props);

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={this.beginPress}
        onPressOut={this.endPress}
        onLayout={this.onLayout}
        style={[{ height: defaultHeight }, style]}
        {...restOfProps}
      >
        <PulseView
          elevated={!!elevationLevel}
          style={[styles.button, this._pulseStyle]}
        >
          <Text
            style={[gs.regularBodyText, styles.label, this.props.labelStyle]}
          >
            {this.props.label}
          </Text>
          {this.props.loading && (
            <View style={this._lineContainerStyle}>
              <Animated.View
                //////////////////////// Override default line animation color, which uses contrast color
                style={[this._lineStyle, { backgroundColor: color }]}
              />
            </View>
          )}
        </PulseView>
      </TouchableOpacity>
    );
  }
}

const PulseView = styled(Animated.View)<{ elevated: boolean }>`
  box-shadow: ${p => (p.elevated ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none")};
`;

const makeStyles = (props: IProps) => {
  const { bordered, dark, color, outlineColor, textColor } = props;
  const backgroundColor = dark ? Colors.black : props.backgroundColor;

  return StyleSheet.create({
    button: {
      borderWidth: bordered || dark ? 1 : 0,
      borderRadius: 4,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      opacity: props.disabled ? 0.3 : 1.0,
      backgroundColor: backgroundColor as any,
      borderColor: (outlineColor || color) as any,
      height: "100%"
    },
    label: {
      fontSize: 12,
      // fontFamily: "Akkurat-Mono",
      lineHeight: 14,
      textAlign: "center",
      color: (textColor || color) as any
    }
  });
};
