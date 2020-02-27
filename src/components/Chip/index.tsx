import React, { MouseEventHandler, ReactNode } from "react";
import { StyleProp, ViewStyle, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import { IColor, ContrastColor, Color } from "@cohubinc/cohub-utils";

import Typography from "src/components/Typography";
import Icon, { IIconProps } from "src/components/Icon";
import { ElevationLevel } from "src/definitions/enums/BoxShadow";
import getBoxShadow from "src/helpers/getBoxShadow";

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
  children?: ReactNode;
}

export type TChipProps = IChipProps;

export default function Chip(props: TChipProps) {
  const {
    children,
    label,
    onPress,
    onDelete,
    checked,
    backgroundColor = Color.grey300,
    style,
    size = 12,
    active = false,
    elevation = 0
  } = props;

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

  const CohubChip = styled.TouchableOpacity`
    background-color: ${setBackgroundColor()};
    border-radius: 361px;
    padding: ${padding};
    height: 32px;
  `;

  return (
    <CohubChip style={[style, getBoxShadow(elevation)]} onPress={onPress}>
      <CohubChipInner>
        <Typography.Small
          color={ContrastColor[setBackgroundColor()] || Color.black}
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
  );
}

const CohubChipInner = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;
