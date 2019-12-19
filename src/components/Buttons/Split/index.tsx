import React from "react";
import { ViewStyle, StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";
import { IColor, ContrastColor } from "@cohubinc/cohub-utils";

import { Color } from "@cohubinc/cohub-utils";
import { IFontFamily } from "src/definitions/types/IFontFamily";
import Typography from "src/components/Typography";

export type Value = string;

export interface IProps {
  values: Value[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  activeTabTextStyle?: StyleProp<TextStyle>;
  backgroundColor?: IColor;
  fontFamily?: IFontFamily;
  bold?: boolean;
}

function SplitButton({
  onChange,
  values,
  selectedIndex,
  style,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  backgroundColor = Color.grey300,
  fontFamily,
  bold
}: IProps) {
  return (
    <Container {...{ backgroundColor, style }}>
      {values.map((val, i) => (
        <Tab
          label={val}
          key={i}
          onPress={() => onChange(i)}
          selected={selectedIndex === i}
          textColor={backgroundColor && ContrastColor[backgroundColor]}
          {...{
            tabStyle,
            activeTabStyle,
            tabTextStyle,
            activeTabTextStyle,
            fontFamily,
            bold
          }}
        />
      ))}
    </Container>
  );
}

const Container = styled.View<{ backgroundColor: IColor }>`
  background-color: ${props => props.backgroundColor};
  padding-top: 8;
  padding-bottom: 8;
  padding-left: 8;
  padding-right: 8;
  flex-direction: row;
  border-radius: 2;
`;

interface ITabProps
  extends Pick<
    IProps,
    | "fontFamily"
    | "bold"
    | "tabStyle"
    | "tabTextStyle"
    | "activeTabTextStyle"
    | "activeTabStyle"
  > {
  label: string;
  onPress: (index: any) => void;
  selected: boolean;
  textColor: IColor;
}

const Tab = ({
  label,
  onPress,
  selected,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  fontFamily,
  bold,
  textColor
}: ITabProps) => {
  return (
    <TabContainer
      style={[tabStyle, selected ? activeTabStyle : {}]}
      selected={selected}
      onPress={onPress}
    >
      <TabText
        {...{ bold, fontFamily }}
        fontFamily={fontFamily}
        color={textColor}
        style={[tabTextStyle, selected && activeTabTextStyle]}
      >
        {label}
      </TabText>
    </TabContainer>
  );
};

const TabContainer = styled.TouchableOpacity<{
  selected: boolean;
}>`
  background: ${props =>
    props.selected ? `hsla(0, 2%, 88%, 0.5)` : `hsla(0, 2%, 88%, 0)`};
  flex: 1;
  border-radius: 2;
  margin-left: 1;
  margin-right: 1;
`;

const TabText = styled(Typography)`
  text-align: center;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 11;
  padding-right: 11;
`;
export default SplitButton;
