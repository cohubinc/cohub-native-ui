import React, { MouseEventHandler, Component } from "react";

import Color, { ContrastColor } from "src/definitions/enums/Color";
import Typography from "src/components/Typography";
import Icon, { IIconProps } from "src/components/Icon";
import HtmlElementProps from "src/definitions/types/HtmlElementProps";

import AddChipInput from "./AddChipInput";
import AvatarChip from "./AvatarChip";

import "./Chip.scss";

interface IChipProps {
  label?: string;
  onDelete?: MouseEventHandler<HTMLElement>;
  checked?: boolean;
  dark?: boolean;
  backgroundColor?: Color;
  size?: number;
  active?: boolean;
}

export type TChipProps = IChipProps &
  Pick<HtmlElementProps, "onClick" | "className" | "style">;

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
      onClick,
      onDelete,
      checked,
      className = "",
      backgroundColor,
      style,
      size,
      active
    } = this.props;

    const name = label || children;
    const clickable = !!onClick;

    const clickableClass = clickable ? "clickable" : "";

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

    return (
      <div
        className={`CohubChip ${clickableClass} ${className}`}
        style={{
          backgroundColor: setBackgroundColor() as any,
          borderRadius: "361px",
          display: "inline-block",
          padding,
          ...style
        }}
        onClick={onClick}
        tabIndex={clickable ? 0 : undefined}
      >
        <div
          className="flex justify-center items-center h-100"
          style={{ cursor: clickable ? "pointer" : "inherit" }}
        >
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
        </div>
      </div>
    );
  }
}
