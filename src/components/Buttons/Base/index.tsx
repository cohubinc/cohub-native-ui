import React from "react";

import Color from "src/definitions/enums/Color";
import Typography from "src/components/Typography";
import Icon from "src/components/Icon";
import { TIconName } from "src/components/Icon/Icons";

import { getInsetColor } from "./getInsetColor";

import "./Base.scss";

type TRootButtonProps = JSX.IntrinsicElements["button"];

export interface IBaseButtonProps extends TRootButtonProps {
  /** Shows success checkmark animation */
  success?: boolean;
  /** Shows error color */
  error?: boolean;
  /**
   * Shows button in raised state
   * @defaultValue true
   */
  raised?: boolean;
  /**
   * Background color of button
   */
  backgroundColor?: Color;
  /**
   * Name of Icon
   */
  icon?: TIconName;

  /**
   * Position of Icon
   */
  iconPosition?: "left" | "right";

  /**
   * Size of Icon
   */
  iconSize?: number;
}

export default function Base(props: IBaseButtonProps) {
  let {
    style,
    className = "",
    children,
    success,
    raised = true,
    backgroundColor = Color.grey600,
    disabled,
    error,
    icon,
    iconPosition = "left",
    iconSize,
    ...restOfProps
  } = props;

  backgroundColor = error ? Color.red500 : backgroundColor;

  const insetColor = raised && getInsetColor(backgroundColor);
  const color = (style && style.color) || "#EFF7EE";
  const flexDirection = iconPosition === "right" ? "row-reverse" : "row";

  return (
    <button
      className={`CohubButton ${className}`}
      style={{
        backgroundColor: backgroundColor as any,
        boxShadow: raised
          ? `0 1px 3px hsla(0, 0%, 0%, 0.1), inset 0px 1px 0px ${insetColor}`
          : undefined,
        ...style
      }}
      disabled={disabled}
      {...restOfProps}
    >
      <div className="button-text relative flex items-center justify-center">
        {/* {success && (
          <div
            className="flex justify-center items-center absolute w-100"
            style={{ zIndex: 2, bottom: -0.5 }}
          >
            <AnimatedCheckmark size="1.25rem" color={color} />
          </div>
        )} */}

        <Typography.Small
          uppercase
          color={color as any}
          style={{
            opacity: success ? 0 : 1
            // transition: "opacity 150ms ease-in"
          }}
        >
          <div className="flex items-center" style={{ flexDirection }}>
            {icon && (
              <Icon
                name={icon}
                color={color as any}
                size={iconSize}
                style={{
                  marginTop: 1
                }}
              />
            )}
            <span
              style={{
                marginLeft: icon && iconPosition === "left" ? "0.5rem" : "",
                marginRight: icon && iconPosition === "right" ? "0.5rem" : ""
              }}
            >
              {children}
            </span>
          </div>
        </Typography.Small>
      </div>
    </button>
  );
}
