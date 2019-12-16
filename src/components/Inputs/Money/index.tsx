import { Decimal } from 'decimal.js-light';
import numeral from 'numeral';
import React, { useEffect, useRef, useState } from 'react';
import {
  NativeSyntheticEvent, StyleSheet, TextInput, TextInputProps, TextInputSubmitEditingEventData
} from 'react-native';

import { Color } from '@cohubinc/cohub-utils';

import FloatingLabel from '../FloatingLabel';

const FORMAT = "$ 0,0.00[000]";

export interface IProps {
  value: number;
  onChange?: (value: string) => any;
  onBlur?: (arg: any) => void;
  onFocus?: (arg: any) => void;
  style?: any;
  textProps?: TextInputProps;
  basic?: boolean;
  label?: string;
}

export default function Money({
  value: val,
  onChange,
  onBlur,
  onFocus,
  style,
  textProps,
  basic,
  label
}: IProps) {
  const input = useRef<TextInput | null>(null);

  const value = (val || "0").toString();

  const [formattedValue, setFormattedValue] = useState(
    numeral(value).format(FORMAT)
  );
  const [numericValue, setNumericValue] = useState(
    new Decimal(removeFormatting(value)).toNumber()
  );

  useEffect(() => {
    if (val || 0 >= 0) {
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
  }, [val]);

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

  const isNumbery = (val?: string) => {
    val = removeFormatting(val || "");
    if (!val) return true;

    const isInt = /^[\d -]+$/.test(val);
    const isFloat = !isNaN(val as any) && val.includes(".");

    return isInt || isFloat;
  };

  return (
    <FloatingLabel
      basic={basic}
      style={[
        {
          paddingHorizontal: 10,
          width
        },
        style
      ]}
      label={label}
      value={formattedValue}
      backgroundColor={Color.trueWhite}
      inputStyle={[basic ? undefined : styles.input, style]}
      render={renderProps => (
        <TextInput
          ref={input}
          {...renderProps}
          {...textProps}
          selectTextOnFocus
          onChangeText={txt => {
            if (!isNumbery(txt)) {
              return;
            }
            changed(txt);
            renderProps.onChangeText && renderProps.onChangeText(txt);
          }}
          onBlur={e => {
            blurred(e);
            renderProps.onBlur && renderProps.onBlur(e);
          }}
          onFocus={e => {
            renderProps.onFocus && renderProps.onFocus(e);
            onFocus && onFocus(e);
          }}
          style={[{ width }, renderProps.style]}
          keyboardType="decimal-pad"
          onSubmitEditing={evt => {
            renderProps.onSubmitEditing && renderProps.onSubmitEditing(evt);
            onSubmitEditing(evt);
          }}
        />
      )}
    />
  );
}

const width = 249;
const styles = StyleSheet.create({
  input: {
    height: 40,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 4,
    color: Color.black
  }
});

function removeFormatting(value: string) {
  const matches = (value.toString() || "0").match(/[\d,\s]+\.?\d*/g) || [];
  return (matches[0] || "0").replace(/[^\d.-]/g, "");
}
