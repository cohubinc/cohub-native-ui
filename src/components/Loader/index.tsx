import React from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import LineLoader from "./LineLoader";
import LoaderUi from "./LoaderUi";

interface IProps {
  style?: StyleProp<ViewStyle>;
  show?: boolean;
  size?: number;
}

export default function Loader(props: IProps) {
  const { style, show = true, size } = props;
  if (!show) return null;

  return <LoaderUi size={size} style={[styles.container, style]} />;
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
