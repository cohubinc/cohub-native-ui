import React, { useImperativeHandle, forwardRef, useState } from "react";
import Icon, { IIconProps } from "../../Icon";
import Color, { ContrastColor } from "src/definitions/enums/Color";
import BoxShadow, { ElevationLevel } from "src/definitions/enums/BoxShadow";
import Buttons from "..";
import { TBlankButtonProps } from "src/components/Buttons/Blank";
import "./FloatingActionButton.scss";

interface IProps {
  icon: IIconProps["name"];
  iconColor?: IIconProps["color"];
  backgroundColor?: Color;
  size?: number;
  elevation?: ElevationLevel;
}

export interface IFabRefObject {
  /**
   * Plays uh-uh-shake animation
   */
  shake: (shakeColor?: string) => void;
}

// tslint:disable only-arrow-functions
export type TFloatingActionButtonProps = IProps & TBlankButtonProps;
const FloatingActionButton: React.RefForwardingComponent<
  IFabRefObject,
  TFloatingActionButtonProps
> = function(props, ref) {
  const {
    icon,
    iconColor,
    backgroundColor = Color.trueWhite,
    size = 24,
    elevation = 8,
    disabled,
    className,
    onClick,
    ...rest
  } = props;

  const [shaking, setShaking] = useState(false);
  const [shakeColor, setShakeColor] = useState<Color | undefined>();
  const [isHovered, setIsHovered] = useState(false);

  useImperativeHandle(
    ref,
    (): IFabRefObject => ({
      shake: color => {
        color && setShakeColor(color as any);
        setShaking(true);

        setTimeout(() => {
          setShaking(false);
          setShakeColor(undefined);
        }, 250);
      }
    })
  );
  let color = iconColor
    ? iconColor
    : (ContrastColor[shakeColor || backgroundColor] as any);
  let computedBackgroundColor = shakeColor || (backgroundColor as any);
  if (isHovered && !disabled && iconColor && onClick) {
    computedBackgroundColor = color;
    color = Color.trueWhite;
  }
  const dpLevel = `dp${elevation}`;

  return (
    <Buttons.Blank
      className={`FloatingActionButton flex items-center justify-center ${
        shaking ? "uh-uh-shake" : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: computedBackgroundColor,
        boxShadow: (BoxShadow as any)[dpLevel],
        border: "none",
        transition: "all 20ms ease-in"
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <Icon
        name={icon}
        size={size / 1.5}
        color={color}
        style={{ marginRight: "auto", marginLeft: "auto" }}
      />
    </Buttons.Blank>
  );
};

export default forwardRef(FloatingActionButton);
