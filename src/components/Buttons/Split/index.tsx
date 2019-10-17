import React from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import gs from "../../../definitions/constants/GlobalStyles";
import Colors from "../../../definitions/enums/Color";

export type Value = string;

export interface IProps {
  values: Value[];
  selectedIndex: number;
  onChange: (index: number) => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const SplitButton = ({
  onChange,
  values,
  selectedIndex,
  style,
  color = Colors.primaryGreen as any
}: IProps) => (
  <SegmentedControlTab
    tabsContainerStyle={style}
    tabTextStyle={[
      gs.monoSmallBodyText,
      {
        color,
        borderColor: color,
        paddingVertical: 12
      }
    ]}
    tabStyle={{
      paddingVertical: 0,
      borderColor: color
    }}
    activeTabTextStyle={styles.activeTabTextStyle}
    activeTabStyle={{
      backgroundColor: color
    }}
    onTabPress={onChange}
    {...{ values, selectedIndex }}
  />
);

const styles = StyleSheet.create({
  activeTabTextStyle: {
    color: Colors.outlineGrey as any
  }
});

export default SplitButton;
