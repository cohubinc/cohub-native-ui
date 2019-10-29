import React, { useState } from "react";
import { FieldRenderProps } from "react-final-form";
import {
  TextInput,
  StyleProp,
  ViewStyle,
  View,
  TextInputProps
} from "react-native";
import { Color, Icon } from "src";

type FieldProps = FieldRenderProps<string, any>;
type INativeProps = Omit<
  TextInputProps,
  "value" | "onChange" | "onBlur" | "onFocus" | "onChangeText" | "style"
>;
export interface IPasswordInputProps extends INativeProps {
  placeholder?: string;
  input?: Partial<FieldProps["input"]>;
  meta?: Partial<FieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

function Password({
  input,
  meta,
  placeholder = "Search",
  style,
  accessibilityLabel = placeholder,
  ...nativeProps
}: IPasswordInputProps) {
  const { onChange, onBlur, onFocus, value } = input || ({} as any);
  const [visible, setVisible] = useState(false);

  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          borderBottomWidth: 1.5,
          borderBottomColor: Color.lightGrey as any,
          paddingVertical: 6
        }
      ]}
    >
      <TextInput
        {...{
          onBlur,
          onFocus,
          placeholder,
          accessibilityLabel,
          ...nativeProps
        }}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChange}
        value={value ? value.toString() : undefined}
        secureTextEntry={!visible}
        style={{
          flex: 1,
          fontSize: 16,
          fontFamily: "Inter",
          color: Color.black as any
        }}
      />
      <Icon.Eye
        color={Color.grey800}
        size={20}
        style={{ marginLeft: 12 }}
        onPress={() => setVisible(!visible)}
      />
    </View>
  );
}

export default Password;
