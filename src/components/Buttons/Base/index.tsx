import React, { useState, forwardRef } from "react";
import { StyleSheet, ViewStyle, View } from "react-native";
import styled from "styled-components/native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { Color, ContrastColor, IColor } from "@cohubinc/cohub-utils";

import IButtonProps from "src/definitions/interfaces/IButtonProps";
import Typography from "src/components/Typography";
import Loader from "src/components/Loader";
import getBoxShadow from "src/helpers/getBoxShadow";

export type IBaseButtonProps = IButtonProps;

const Base = forwardRef((props: IButtonProps, ref: any) => {
  const {
    style: incomingStyleProp,
    labelStyle,
    label,
    loading,
    elevationLevel = 0,
    elevated,
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

  const [elementWidth, setElementWidth] = useState(0);

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
        getBoxShadow(elevated ? 3 : elevationLevel),
        incomingStyleProp,
        { width, height }
      ]}
      onLayout={event => {
        const dimensions = event.nativeEvent.layout;

        setElementWidth(dimensions.width);
      }}
    >
      <Touchable
        ref={ref}
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
              width: elementWidth,
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
});

export default Base;

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
