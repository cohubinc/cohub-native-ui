import React, { MouseEventHandler, Component } from "react";
import { IColor, ContrastColor, Color } from "@cohubinc/cohub-utils";

import Typography from "src/components/Typography";
import Icon, { IIconProps } from "src/components/Icon";
import styled from "styled-components/native";

import { StyleProp, ViewStyle, GestureResponderEvent } from "react-native";
import BoxShadow, { ElevationLevel } from "src/definitions/enums/BoxShadow";

interface IChipProps {
  label?: string;
  onDelete?: MouseEventHandler<HTMLElement>;
  checked?: boolean;
  dark?: boolean;
  backgroundColor?: IColor;
  size?: number;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  elevation?: ElevationLevel;
}

export type TChipProps = IChipProps;

export default class Chip extends Component<TChipProps> {
  static defaultProps: Partial<TChipProps> = {
    size: 12,
    backgroundColor: Color.grey300,
    active: false
  };

  render() {
    const {
      children,
      label,
      onPress,
      onDelete,
      checked,
      backgroundColor,
      style,
      size,
      active,
      elevation = 0
    } = this.props;

    const name = label || children;

    let iconName: IIconProps["name"] | undefined;
    if (checked) {
      iconName = "checkmark";
    } else if (onDelete) {
      iconName = "close";
    }

    const padding = `${size! / 2.5}px ${size}px`;

    const setBackgroundColor = () => {
      if (active) {
        return Color.green500;
      } else {
        return backgroundColor as Color;
      }
    };

    const dpLevel = `dp${elevation}`;

    const CohubChip = styled.TouchableOpacity`
      background-color: ${setBackgroundColor() as any};
      border-radius: 361px;
      padding: ${padding};
      height: 32px;
    `;

    const CohubChipInner = styled.View`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    `;

    const Wrapper = styled.View<{ boxShadow: BoxShadow }>`
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      box-shadow: ${props => props.boxShadow || "none"};
    `;

    return (
      <Wrapper boxShadow={(BoxShadow as any)[dpLevel]}>
        <CohubChip style={style} onPress={onPress}>
          <CohubChipInner>
            <Typography.Small
              color={ContrastColor[setBackgroundColor()] as any}
              style={{ marginRight: 5 }}
            >
              {name}
            </Typography.Small>

            {iconName && (
              <Icon
                onPress={e => onDelete && onDelete(e as any)}
                size={16}
                name={iconName}
                color={ContrastColor[setBackgroundColor()] as any}
              />
            )}
          </CohubChipInner>
        </CohubChip>
      </Wrapper>
    );
  }
}
