import React, { MouseEventHandler, Component } from "react";

import Color, { ContrastColor } from "src/definitions/enums/Color";
import Typography from "src/components/Typography";
import Icon, { IIconProps } from "src/components/Icon";
import styled from "styled-components/native";

import AddChipInput from "./AddChipInput";
import AvatarChip from "./AvatarChip";

import { StyleProp, ViewStyle, GestureResponderEvent } from "react-native";

interface IChipProps {
  label?: string;
  onDelete?: MouseEventHandler<HTMLElement>;
  checked?: boolean;
  dark?: boolean;
  backgroundColor?: Color;
  size?: number;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export type TChipProps = IChipProps;

export default class Chip extends Component<TChipProps> {
  static Add = AddChipInput;
  static Avatar = AvatarChip;

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
      active
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

    const CohubChip = styled.TouchableHighlight`
      background-color: ${setBackgroundColor() as any};
      border-radius: 361px;
      padding: ${padding};
      height: 32px;
    `;

    const CohubChipInner = styled.View`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 100%;
    `;

    return (
      <CohubChip style={style} onPress={onPress}>
        <CohubChipInner>
          <Typography.Small color={ContrastColor[setBackgroundColor()] as any}>
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
    );
  }
}
