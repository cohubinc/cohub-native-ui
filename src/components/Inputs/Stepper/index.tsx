import React, { useState, useEffect } from "react";
import { ViewStyle, StyleProp } from "react-native";
import { Color } from "src";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components/native";
import { isInt } from "@cohubinc/cohub-utils";

import StepBtn from "./StepBtn";

type FieldProps = FieldRenderProps<number, IFixMe>;
type TInput = Partial<FieldProps["input"]>;
interface IStepperInputProps {
  input?: TInput;
  meta?: Partial<FieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
  step?: number;
  allowNegative?: boolean;
  accessibilityLabel: string;
}

const Container = styled.View`
  border-radius: 68px;
  background-color: ${Color.grey300};
  flex-direction: row;
  height: 72px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 32px;
  font-family: Inter;
  padding: 6px 0;
  color: #3a3b4e;
  text-align: center;
  font-family: Inter;
`;

export default function Stepper({
  input = {} as TInput,
  meta,
  style,
  step = 1,
  allowNegative,
  accessibilityLabel
}: IStepperInputProps) {
  const { onBlur, onFocus } = input;
  const value = input.value || 0;
  const [tmpVal, setTmpVal] = useState(value);

  useEffect(() => {
    input.onChange && input.onChange(tmpVal);
  }, [tmpVal]);

  // Track incoming value prop and keep the
  // tmpVal state in sync with any changes
  useEffect(() => {
    setTmpVal(value);
  }, [value]);

  function handleChange(val: string) {
    if (val === "") {
      setTmpVal(0);
      return;
    }
    if (!isInt(val)) return;

    const numVal = Number.parseFloat(val);
    // numVal could be NaN, if so return early
    if (!numVal && numVal !== 0) return;

    setTmpVal(numVal);
  }

  const disabled = allowNegative ? false : value <= 0;

  return (
    <Container
      style={style}
      accessibilityLabel={`${accessibilityLabel} count adjuster control`}
    >
      <StepBtn
        borderSide="Right"
        iconName="subtract"
        accessibilityLabel={`adjust count down by ${step}`}
        disabled={disabled}
        onPress={() => {
          setTmpVal(val => {
            let nextDecrement = val - step;
            if (nextDecrement <= 0 && !allowNegative) {
              nextDecrement = 0;
            }

            return nextDecrement;
          });
        }}
      />

      <Input
        accessibilityLabel={`${accessibilityLabel} count`}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleChange}
        value={tmpVal ? tmpVal.toString() : "0"}
        selectTextOnFocus={true}
        onFocus={e => {
          onFocus && onFocus(e as IFixMe);
        }}
        onBlur={onBlur as IFixMe}
      />

      <StepBtn
        borderSide="Left"
        iconName="add"
        accessibilityLabel={`adjust count up by ${step}`}
        onPress={() => {
          setTmpVal(v => v + step);
        }}
      />
    </Container>
  );
}
