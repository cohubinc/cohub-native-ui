import React, { PureComponent, CSSProperties } from "react";
import Blank from "../Blank";
import Color from "src/definitions/enums/Color";
import Typography from "src/components/Typography";
import { TBlankButtonProps } from "src/components/Buttons/Blank";
import { TextStyle, StyleProp } from "react-native";

interface IProps {
  color?: Color;
  fontSize?: number | string;
  textStyle?: StyleProp<TextStyle>;
  block?: boolean;
}

export type TTextButtonProps = IProps & Omit<TBlankButtonProps, "color">;

export default class Text extends PureComponent<TTextButtonProps> {
  static defaultProps: Partial<IProps> = {
    color: Color.iconGrey,
    fontSize: "12px"
  };

  render() {
    const {
      color,
      fontSize,
      children,
      textStyle,
      block,
      style,
      disabled,
      ...rest
    } = this.props;

    return (
      <Blank
        {...rest}
        disabled={disabled}
        style={{
          display: block ? "block" : undefined,
          padding: "0.5rem",
          ...style
        }}
      >
        <Typography
          uppercase
          color={disabled ? Color.grey600 : color}
          weight={"500"}
          style={textStyle}
          kerning={0.07}
        >
          {children}
        </Typography>
      </Blank>
    );
  }
}
