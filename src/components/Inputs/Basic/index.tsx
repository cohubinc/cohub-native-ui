import React from "react";
import { FieldRenderProps } from "react-final-form";
import { TextInput, StyleProp, ViewStyle, View } from "react-native";
import { Color, Typography } from "src";

type FieldProps = FieldRenderProps<string, any>;

interface IBasicInputProps {
  placeholder?: string;
  label?: string;
  input?: Partial<FieldProps["input"]>;
  meta?: Partial<FieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
}

export default function Basic({
  input,
  meta,
  placeholder,
  style,
  label
}: IBasicInputProps) {
  const { onChange, onBlur, onFocus, value } = input || ({} as any);

  return (
    <View style={style}>
      <Typography.Small color={Color.primary}>{label}</Typography.Small>
      <TextInput
        {...{ onBlur, onFocus, placeholder }}
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
          paddingVertical: 6
        }}
      />
    </View>
  );
}
