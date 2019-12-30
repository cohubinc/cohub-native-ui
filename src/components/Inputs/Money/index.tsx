import { Decimal } from "decimal.js-light";
import numeral from "numeral";
import React, { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputProps,
  TextInputSubmitEditingEventData
} from "react-native";

import Basic from "../Basic";
import { FieldRenderProps } from "react-final-form";
import { IColor } from "@cohubinc/cohub-utils";

const FORMAT = "$ 0,0.00[000]";

type IFieldProps = FieldRenderProps<string, any>;

export interface IProps {
  placeholder?: string;
  label?: string;
  input?: Partial<IFieldProps["input"]>;
  meta?: Partial<IFieldProps["meta"]>;
  style?: any;
  textProps?: TextInputProps;
  inputRef?: React.RefObject<TextInput>;
  onSubmitEditing?: () => void;
  tintColor?: IColor;
}

export default function Money({
  input,
  style,
  textProps,
  label,
  inputRef,
  tintColor,
  onSubmitEditing: passedOnSubmitEditing
}: IProps) {
  const value = (input?.value || "0").toString();
  const { onChange, onBlur, onFocus } = input || {};

  const [formattedValue, setFormattedValue] = useState(
    numeral(value).format(FORMAT)
  );
  const [numericValue, setNumericValue] = useState(
    new Decimal(removeFormatting(value)).toNumber()
  );

  useEffect(() => {
    if (input?.value || 0 >= 0) {
      const stringVal = removeFormatting(value.toString());
      const numericVal = new Decimal(stringVal).toNumber();

      if (numericValue !== numericVal) {
        setFormattedValue(numeral(stringVal).format(FORMAT));
        setNumericValue(numericValue);

        if (onChange) {
          onChange(numericValue.toString());
        }
      }
    }
  }, [input?.value]);

  const blurred = (evt: any) => {
    const stringValue = removeFormatting(formattedValue);
    setFormattedValue(numeral(stringValue).format(FORMAT));
    setNumericValue(new Decimal(stringValue).toNumber());

    onBlur && onBlur(evt);
  };

  const onSubmitEditing = (
    evt: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    blurred(evt);
    passedOnSubmitEditing && passedOnSubmitEditing();
  };

  const changed = (text: string) => {
    if (text.startsWith(".")) {
      text = "0.";
    }
    const unformattedVal = removeFormatting(text);
    const numericVal = new Decimal(`0${unformattedVal}`).toNumber();
    setNumericValue(numericVal);
    setFormattedValue(text);

    if (onChange) {
      onChange(numericValue.toString());
    }
  };

  return (
    <Basic
      style={[style]}
      label={label}
      tintColor={tintColor}
      input={{
        onBlur: e => {
          blurred(e);
          onBlur && onBlur(e);
        },
        onChange: txt => {
          if (!isNumbery(txt)) {
            return;
          }
          changed(txt);
          onChange && onChange(txt);
        },
        onFocus: e => {
          onFocus && onFocus(e);
        },
        value: formattedValue
      }}
      onSubmitEditing={onSubmitEditing}
      keyboardType="decimal-pad"
      returnKeyType="done"
      selectTextOnFocus
      inputRef={inputRef}
      inputStyle={[style]}
      {...textProps}
    />
  );
}

function removeFormatting(value: string) {
  const matches = (value.toString() || "0").match(/[\d,\s]+\.?\d*/g) || [];
  return (matches[0] || "0").replace(/[^\d.-]/g, "");
}

function isNumbery(value?: string) {
  value = removeFormatting(value || "");
  if (!value) return true;

  const isInt = /^[\d -]+$/.test(value);
  const isFloat = !isNaN(value as any) && value.includes(".");

  return isInt || isFloat;
}
