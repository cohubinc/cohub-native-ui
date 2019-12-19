import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import LineLoader from "./LineLoader";
import LoaderUi from "./LoaderUi";
import { IColor, Color } from "@cohubinc/cohub-utils";

interface IProps {
  style?: StyleProp<ViewStyle>;
  show?: boolean;
  size?: number;
  color?: IColor;
}

export default function Loader(props: IProps) {
  const { style, show = true, size, color = Color.primary } = props;
  if (!show) return null;

  return (
    <LoaderUi size={size} style={[styles.container, style]} color={color} />
  );
}

Loader.Line = LineLoader;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  }
});
