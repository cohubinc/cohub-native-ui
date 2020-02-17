import React, { useState } from "react";
import { StyleSheet, ViewStyle, View } from "react-native";
import styled from "styled-components/native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Color, ContrastColor, IColor } from "@cohubinc/cohub-utils";

import IButtonProps from "src/definitions/interfaces/IButtonProps";
import Typography from "src/components/Typography";
import Loader from "src/components/Loader";

export type IBaseButtonProps = IButtonProps;

export default function Base(props: IButtonProps) {
  const {
    style: incomingStyleProp,
    labelStyle,
    label,
    loading,
    elevationLevel = 0,
    color = Color.grey400,
    absolutePosition,
    loaderColor = ContrastColor[color],
    borderColor,
    onPress,
    enableHaptics,
    accessibilityLabel,
    disabled,
    mono,
    bold,
    width,
    height = 40,
    ...rest
  } = props;

  const [elementwidth, setElementwidth] = useState(0);

  let accessibilityLabelDefault: IBaseButtonProps["accessibilityLabel"] =
    "button";

  if (!accessibilityLabel) {
    if (typeof label === "string") {
      accessibilityLabelDefault = label;
    }
  }

  const styles = makeStyles(props);

  const positionStyles: ViewStyle | false = !!absolutePosition && {
    position: "absolute",
    ...absolutePosition
  };

  const borderRadius = 4;

  return (
    <View
      testID="button-container"
      style={[
        positionStyles,
        { backgroundColor: Color.trueWhite, borderRadius },
        boxShadowsMap[elevationLevel],
        incomingStyleProp,
        { width, height }
      ]}
      onLayout={event => {
        const demensions = event.nativeEvent.layout;

        setElementwidth(demensions.width);
      }}
    >
      <Touchable
        style={[
          {
            borderColor,
            borderRadius,
            borderWidth: borderColor ? 1 : 0,
            paddingHorizontal: 15,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            opacity: disabled ? 0.3 : 1.0,
            backgroundColor: color
          },
          incomingStyleProp,
          { width: "100%", height: "100%" }
        ]}
        onPress={e => {
          onPress(e);
          enableHaptics && ReactNativeHapticFeedback.trigger("impactHeavy", {});
        }}
        accessibilityLabel={accessibilityLabelDefault}
        disabled={disabled}
        {...rest}
      >
        <Typography
          color={(labelStyle?.color as IColor) || ContrastColor[color]}
          bold={bold}
          mono={mono}
          fontFamily={labelStyle?.fontFamily}
          style={[styles.label, labelStyle]}
        >
          {label}
        </Typography>

        <Loader.Line
          style={[
            {
              width: elementwidth,
              position: "absolute",
              bottom: 0
            }
          ]}
          show={!!loading}
          color={loaderColor}
        />
      </Touchable>
    </View>
  );
}

const boxShadowThree = {
  shadowColor: "rgba(0, 0, 0, 0.12)",
  shadowOffset: { height: 1, width: 0 },
  shadowOpacity: 1,
  shadowRadius: 8
};

const boxShadowsMap = { 0: null, 3: boxShadowThree };

const Touchable = styled.TouchableOpacity`
  padding: 0px 15px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const makeStyles = (p: IButtonProps) =>
  StyleSheet.create({
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
