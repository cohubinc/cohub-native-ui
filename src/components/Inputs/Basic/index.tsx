import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  TextInput,
  StyleProp,
  ViewStyle,
  View,
  TextInputProps
} from "react-native";
import Color from "src/definitions/enums/Color";
import Typography from "src/components/Typography";
import Icon, { IIconProps } from "src/components/Icon";

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
  icon?: IIconProps;
  iconPosition?: "left" | "right";
}

export default function Basic({
  input,
  meta,
  placeholder,
  style,
  label,
  accessibilityLabel,
  icon,
  iconPosition = "left",
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
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1.5,
          borderBottomColor: Color.lightGrey as any,
          paddingVertical: 6,
          flexDirection: "row"
        }}
      >
        {icon && iconPosition === "left" && (
          <Icon
            name={icon.name}
            size={20}
            color={icon.color}
            onPress={icon.onPress}
            style={{ marginRight: 13 }}
          />
        )}
        <TextInput
          {...{ onBlur, onFocus, placeholder, ...nativeProps }}
          accessibilityLabel={accessibilityLabelText}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChange}
          value={value ? value.toString() : undefined}
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: "Inter",
            color: Color.black as any
          }}
        />
        {icon && iconPosition === "right" && (
          <Icon
            name={icon.name}
            size={20}
            color={icon.color}
            onPress={icon.onPress}
            style={{ marginLeft: 13 }}
          />
        )}
      </View>
    </View>
  );
}
