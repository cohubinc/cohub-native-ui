import React from "react";
import {
  ViewStyle,
  StyleProp,
  TouchableWithoutFeedbackProps
} from "react-native";
import { Color } from "src";
import { FieldRenderProps } from "react-final-form";
import { isInt } from "@cohubinc/cohub-utils";

import Icon from "src/components/Icon";
import { TIconName } from "src/components/Icon/Icons";
import styled from "styled-components/native";

type FieldProps = FieldRenderProps<number, IFixMe>;
type TInput = Partial<FieldProps["input"]>;
interface IStepperInputProps {
  input?: TInput;
  meta?: Partial<FieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
  step?: number;
  allowNegative?: boolean;
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
  allowNegative
}: IStepperInputProps) {
  const { onBlur, onFocus, onChange } = input;
  // value might come in as an empty string
  const value = input.value || 0;

  function handleChange(val: string) {
    if (val === "") {
      onChange && onChange(0);
      return;
    }
    if (!isInt(val)) return;

    const numVal = Number.parseFloat(val);
    // numVal could be NaN, if so return early
    if (!numVal && numVal !== 0) return;

    onChange && onChange(numVal);
  }

  return (
    <Container style={style}>
      <StepBtn
        borderSide="Right"
        iconName="subtract"
        disabled={!allowNegative && value < 1}
        onPress={() => {
          onChange && onChange(value - step);
        }}
      />

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleChange}
        value={value ? value.toString() : "0"}
        onFocus={e => {
          onFocus && onFocus(e as IFixMe);
        }}
        onBlur={onBlur as IFixMe}
      />

      <StepBtn
        borderSide="Left"
        iconName="add"
        onPress={() => {
          onChange && onChange(value + step);
        }}
      />
    </Container>
  );
}

interface IStepBtnProps extends Pick<TouchableWithoutFeedbackProps, "onPress"> {
  iconName: TIconName;
  borderSide: "Left" | "Right";
  disabled?: boolean;
}
const StepBtnContainer = styled.View`
  flex: 1;
  border-color: ${Color.lightGrey};
  margin: 5px 0;
`;
const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StepBtn = (props: IStepBtnProps) => {
  const { onPress, iconName, borderSide, disabled } = props;
  const borderStyle = { [`border${borderSide}Width`]: 1 };

  return (
    <StepBtnContainer style={borderStyle}>
      <Btn
        onPress={onPress}
        style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
        disabled={disabled}
      >
        <Icon
          name={iconName}
          color={Color.black}
          disabled={disabled}
          onPress={onPress}
        />
      </Btn>
    </StepBtnContainer>
  );
};
