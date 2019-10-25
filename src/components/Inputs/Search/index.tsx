import React from "react";
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
export interface ISearchInputProps extends INativeProps {
  placeholder?: string;
  input?: Partial<FieldProps["input"]>;
  meta?: Partial<FieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

function Search({
  input,
  meta,
  placeholder = "Search",
  style,
  accessibilityLabel = placeholder,
  ...nativeProps
}: ISearchInputProps) {
  const { onChange, onBlur, onFocus, value } = input || ({} as any);

  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          borderBottomColor: Color.black as any,
          borderBottomWidth: 1,
          paddingBottom: 6
        }
      ]}
    >
      <Icon.Search color={Color.black} size={16} style={{ marginRight: 12 }} />
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
        style={{
          width: "100%",
          fontSize: 16,
          fontFamily: "Inter",
          color: Color.black as any
        }}
      />
    </View>
  );
}

export default Search;
