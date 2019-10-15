import React, { useState, useRef, CSSProperties } from "react";
import isEmpty from "lodash/isEmpty";

import Color, { ContrastColor } from "src/definitions/enums/Color";
import Icon from "src/components/Icon";
import { TIconName } from "src/components/Icon/Icons";

import TInputElementProps from "../definitions/TInputElementProps";
import IComponentProps from "./IComponentProps";
import IRenderProps from "./IRenderProps";

import "./FloatingLabelWrapper.scss";

type TValue = string | number | undefined | any[] | { [key: string]: string };

export interface IFloatingLabelWrapperProps<T = TValue> {
  onChange?: (...args: any[]) => void;

  value?: T;

  className?: string;
  /**
   * Floating label for the input
   */
  label?: string;

  /**
   * Input is invalid
   */
  error?: boolean;

  appearance?: "contrast" | "inverted";

  /** Render Props function */
  children: (props: IRenderProps<T>) => JSX.Element;

  floatLabel?: boolean;

  labelPosition?: "inside" | "outside" | "intersect";

  icon?: IFloatingLabelIconProps;

  /**
   * HTML attribute for the label
   * It will be passed back through the render props as id for use with the native input element
   * This prop defaults to whatever the value of the label prop is, which should be sufficient most of the time
   */
  htmlFor?: string;

  /**
   * HTML attribute for debugging the input
   */
  "data-qa"?: string;

  /**
   * HTML attribute for debugging the label
   */
  "data-qa-label"?: string;

  required?: boolean;

  placeholder?: string;
}

export interface IFloatingLabelIconProps {
  name: TIconName;
  color: Color;
  onClick?: () => void;
}

type TFloatingLabelWrapperProps<T> = IFloatingLabelWrapperProps<T> &
  Pick<TInputElementProps, "onBlur" | "onFocus" | "onClick" | "style">;

const baseStyle: CSSProperties = {
  cursor: "text"
};

export default function FloatingLabelWrapper<T = TValue>(
  props: TFloatingLabelWrapperProps<T | undefined>
) {
  const {
    className = "",
    appearance,
    onClick,
    style,
    floatLabel,
    labelPosition = "outside",
    onFocus,
    onBlur,
    icon,
    htmlFor,
    error,
    onChange,
    children,
    label,
    value,
    required,
    "data-qa-label": dataQaLabel = "base-input-element-label"
  } = props;

  const [hasFocus, setHasFocus] = useState(false);

  const combinedStyles = { ...baseStyle, ...style };

  const { cursor, textAlign } = combinedStyles;

  const inputRef = useRef<HTMLInputElement>(null);

  const isValidString = value && typeof value === "string" && !!value.length;
  const isValidNumber = typeof value === "number";
  const isValidObject = value && !isEmpty(value);

  const labelFloated =
    floatLabel ||
    hasFocus ||
    (inputRef.current && inputRef.current.value) ||
    isValidString ||
    isValidNumber ||
    isValidObject;

  const setInputRef = (element: HTMLInputElement) => {
    (inputRef.current as any) = element;
  };

  let labelTextColor = Color.grey700;
  let inputClassName = "GenericInput";
  let labelBackground = Color.trueWhite;
  let color: any = Color.black;
  switch (appearance) {
    case "contrast":
      labelTextColor = Color.grey700;
      labelBackground = labelFloated ? "transparent" : (Color.grey300 as any);
      inputClassName = "ContrastInput";
      break;
    case "inverted":
      labelTextColor = Color.trueWhite;
      labelBackground = Color.darkBlack;
      inputClassName = "GenericInput inverted";
      color = Color.trueWhite;
  }

  const componentProps: IComponentProps<typeof value | undefined> = {
    onFocus: (e: any) => {
      onFocus && onFocus(e);
      setHasFocus(true);
    },
    onBlur: (e: any) => {
      onBlur && onBlur(e);
      setHasFocus(false);
    },
    style: {
      color,
      cursor,
      textAlign
    },
    // So the label is associated with the input. Mostly for easier testing
    id: htmlFor,
    ["aria-invalid"]: error,
    onClick,
    onChange,
    value
  };

  const labelPositionClass = () => {
    switch (labelPosition) {
      case "outside":
        return "label-outside";
      case "inside":
        return "label-inside";
      case "intersect":
        return appearance === "contrast" ? "label-outside" : "label-intersect";
      default:
        return "label-outside";
    }
  };
  let labelStyle = {
    backgroundColor: labelBackground as any,
    color: labelTextColor as any,
    cursor
  };

  if (error) {
    const errColor = Color.red100;

    if (appearance === "inverted") {
      labelStyle.color = Color.red400;
    } else {
      labelStyle.backgroundColor = errColor;
      labelStyle.color = ContrastColor[errColor];
    }

    if (appearance === "contrast" && labelFloated) {
      labelStyle.backgroundColor = "transparent";
    }
  }

  const hasTruthyValue = isValueTruthy(value);

  return (
    <div
      className={`FloatingLabelWrapper ${inputClassName} ${className}`}
      style={{
        position: "relative",
        ...combinedStyles
      }}
    >
      <div
        className={`inputWrapper ${label ? "noLabel" : ""} ${
          error ? "error" : ""
        } bd-radius`}
      >
        {children({
          componentProps,
          setInputRef
        })}
        <span className={`bar ${hasFocus ? "focused" : ""}`} />
        {!error && !hasTruthyValue && required && (
          <Icon.Asterisk
            size={12}
            color={Color.red300}
            transform={{ translateX: 50 }}
            style={{
              position: "absolute",
              right: "4px",
              top: "30%",
              zIndex: 2
            }}
          />
        )}
        {error && (
          <Icon.Error
            size={20}
            color={Color.red400}
            transform={{ translateX: 50 }}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              zIndex: 2
            }}
          />
        )}
        {!error && icon && (
          <Icon
            name={icon.name}
            size={20}
            color={icon.color as any}
            onPress={icon.onClick}
            transform={{ translateX: 50 }}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              zIndex: 2
            }}
          />
        )}
      </div>

      {label && (
        <label
          className={`${
            labelFloated ? "floatedLabel" : ""
          } ${labelPositionClass()}`}
          style={labelStyle}
          onClick={(e: any) => {
            onClick && onClick(e);
            inputRef.current && inputRef.current.focus();
          }}
          data-qa={dataQaLabel}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
    </div>
  );
}

function isValueTruthy<T = TValue>(value: T) {
  if (value === undefined) return false;

  switch (typeof value) {
    case "string":
      return !!value;
    case "number":
      // If we made it here value is truthy. Any number is valid, even zero
      return true;
    default:
      // It must either be an Array or an object literal at this point
      return !isEmpty(value);
  }
}
