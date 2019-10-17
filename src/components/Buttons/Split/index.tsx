import React from "react";
import { ViewStyle, StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";
import { Color } from "src";

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
}

function SplitButton({
  onChange,
  values,
  selectedIndex,
  style,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle
}: IProps) {
  const Container = styled.View<{ backgroundColor: string }>`
    background-color: ${props => props.backgroundColor};
    padding-top: 8;
    padding-bottom: 8;
    padding-left: 8;
    padding-right: 8;
    flex-direction: row;
    border-radius: 2;
  `;

  return (
    <Container backgroundColor={Color.grey300 as any} style={style}>
      {values.map((val, i) => (
        <Tab
          label={val}
          key={i}
          onPress={() => onChange(i)}
          selected={selectedIndex === i}
          {...{
            tabStyle,
            activeTabStyle,
            tabTextStyle,
            activeTabTextStyle
          }}
        />
      ))}
    </Container>
  );
}

interface ITabProps {
  label: string;
  onPress: (index: any) => void;
  selected: boolean;
  tabStyle: StyleProp<ViewStyle>;
  activeTabStyle: StyleProp<ViewStyle>;
  tabTextStyle: StyleProp<TextStyle>;
  activeTabTextStyle: StyleProp<TextStyle>;
}

const Tab = ({
  label,
  onPress,
  selected,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle
}: ITabProps) => {
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

  const TabText = styled.Text`
    text-align: center;
    padding-top: 10;
    padding-bottom: 10;
    padding-left: 11;
    padding-right: 11;
  `;
  return (
    <TabContainer
      style={[tabStyle, selected ? activeTabStyle : {}]}
      selected={selected}
      onPress={onPress}
    >
      <TabText style={[tabTextStyle, selected ? activeTabTextStyle : {}]}>
        {label}
      </TabText>
    </TabContainer>
  );
};

export default SplitButton;
