import React, { useState, useEffect, useCallback, useRef } from "react";
import { ViewStyle, StyleProp } from "react-native";
import { FieldRenderProps } from "react-final-form";
import styled from "styled-components/native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import debounce from "lodash/debounce";
import { isInt } from "@cohubinc/cohub-utils";
import { Color } from "@cohubinc/cohub-utils";

import StepBtn from "./StepBtn";

type FieldProps = FieldRenderProps<number, IFixMe>;
type TInput = Partial<FieldProps["input"]>;
interface IStepperInputProps {
  input?: TInput;
  meta?: Partial<FieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
  step?: number;
  allowNegative?: boolean;
  lowerLimit?: number;
  upperLimit?: number;
  accessibilityLabel: string;
  enableHaptics?: boolean;
  disabled?: boolean;
  debounceOnChange?: boolean;
  /**
   * This function will be called when belowNegative is false and the value goes below zero or the defined lower limit
   */
  onRemove?: () => void;
}

const Container = styled.View`
  border-radius: 361px;
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

export default function Stepper(props: IStepperInputProps) {
  const {
    input = {} as TInput,
    style,
    step = 1,
    allowNegative,
    lowerLimit,
    upperLimit,
    accessibilityLabel,
    debounceOnChange,
    enableHaptics = false,
    disabled = false,
    onRemove
  } = props;

  const { onBlur, onFocus } = input;
  const value = input.value || 0;
  const [tmpVal, setTmpVal] = useState(value);

  const shouldRemove =
    !!onRemove &&
    (lowerLimit ? value <= lowerLimit : value <= 0 && !allowNegative);

  // We are debouncing this function so this input can update a value thats stored in redux without performance issues.
  // The way this is written the FIRST input.onChange function passed in through the props is the only one that ever gets used.
  const memoizedOnChange = useCallback(
    debounceOnChange
      ? debounce(
          (val: number) => {
            input.onChange && input.onChange(val);
          },
          150,
          {
            trailing: true,
            leading: false
          }
        )
      : (val: number) => {
          return input.onChange && input.onChange(val);
        },
    [input.onChange, accessibilityLabel]
  );
  useEffect(() => {
    memoizedOnChange(tmpVal);
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

    let numVal = Number.parseFloat(val);
    // numVal could be NaN, if so return early
    if (!numVal && numVal !== 0) return;

    if (enableHaptics) {
      ReactNativeHapticFeedback.trigger("selection", {});
    }

    if (numVal <= 0 && !allowNegative) {
      numVal = 0;
    }

    if (lowerLimit && numVal <= lowerLimit) {
      numVal = lowerLimit;
    }

    if (upperLimit && numVal >= upperLimit) {
      numVal = upperLimit;
    }

    setTmpVal(numVal);
  }

  let minusDisabled = allowNegative ? false : value <= 0;
  minusDisabled = lowerLimit ? value <= lowerLimit : minusDisabled;
  minusDisabled = minusDisabled && !onRemove;
  const plusDisabled = upperLimit ? value >= upperLimit : false;

  return (
    <Container
      style={style}
      accessibilityLabel={`${accessibilityLabel} count adjuster control`}
    >
      <StepBtn
        showRemove={shouldRemove}
        borderSide="Right"
        iconName="subtract"
        accessibilityLabel={
          shouldRemove ? "remove item" : `adjust count down by ${step}`
        }
        disabled={disabled || minusDisabled}
        onPress={() => {
          if (enableHaptics) {
            ReactNativeHapticFeedback.trigger("selection", {});
          }

          if (shouldRemove) {
            onRemove && onRemove();
            return;
          }

          setTmpVal(val => {
            let nextDecrement = val - step;

            if (nextDecrement <= 0 && !allowNegative) {
              nextDecrement = 0;
            }

            if (lowerLimit && nextDecrement <= lowerLimit) {
              nextDecrement = lowerLimit;
            }

            return nextDecrement;
          });
        }}
      />

      <Input
        accessibilityLabel={`${accessibilityLabel} count`}
        keyboardType="decimal-pad"
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleChange}
        style={disabled ? { color: Color.black, opacity: 0.8 } : {}}
        editable={!disabled}
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
        disabled={disabled || plusDisabled}
        accessibilityLabel={`adjust count up by ${step}`}
        onPress={() => {
          if (enableHaptics) {
            ReactNativeHapticFeedback.trigger("selection", {});
          }

          setTmpVal(val => {
            let nextDecrement = val + step;

            if (upperLimit && nextDecrement >= upperLimit) {
              nextDecrement = upperLimit;
            }

            return nextDecrement;
          });
        }}
      />
    </Container>
  );
}
