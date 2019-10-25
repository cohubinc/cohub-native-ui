import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  TextInput,
  StyleProp,
  ViewStyle,
  View,
  TextInputProps
} from "react-native";
import { Color, Typography } from "src";

type INativeProps = Omit<
  TextInputProps,
  "value" | "onChange" | "onBlur" | "onFocus" | "onChangeText" | "style"
>;
type IFieldProps = FieldRenderProps<string, any>;
interface IBasicInputProps extends INativeProps {
  placeholder?: string;
  label?: string;
  input?: Partial<IFieldProps["input"]>;
  meta?: Partial<IFieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  textColor?: Color;
}

export default function Basic({
  input,
  meta,
  placeholder,
  style,
  label,
  accessibilityLabel,
  ...nativeProps
}: IBasicInputProps) {
  const { onChange, onBlur, onFocus, value } = input || ({} as any);

  const accessibilityLabelText = accessibilityLabel || label || placeholder;

  if (!accessibilityLabelText) {
    console.warn(
      "You should be passing an accessibilityLabel prop if your not going to define label or placeholder"
    );
  }

  return (
    <View style={style}>
      <Typography.Small color={Color.primary}>{label}</Typography.Small>
      <TextInput
        {...{ onBlur, onFocus, placeholder, ...nativeProps }}
        accessibilityLabel={accessibilityLabelText}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChange}
        value={value ? value.toString() : undefined}
        style={{
          width: "100%",
          borderBottomWidth: 1.5,
          borderBottomColor: Color.lightGrey as any,
          fontSize: 16,
          fontFamily: "Inter",
          paddingVertical: 6,
          color: Color.black as any
        }}
      />
    </View>
  );
}
