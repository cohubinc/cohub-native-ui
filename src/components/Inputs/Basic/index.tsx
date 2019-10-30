import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  TextInput,
  StyleProp,
  ViewStyle,
  View,
  TextInputProps,
  TextStyle
} from "react-native";
import Color from "src/definitions/enums/Color";
import Typography, { ITypographyProps } from "src/components/Typography";
import Icon, { IIconProps } from "src/components/Icon";

type INativeProps = Omit<
  TextInputProps,
  "value" | "onChange" | "onBlur" | "onFocus" | "onChangeText" | "style"
>;
type IFieldProps = FieldRenderProps<string, any>;
type ISize = 1 | 2 | 3;
interface IBasicInputProps extends INativeProps {
  placeholder?: string;
  label?: string;
  input?: Partial<IFieldProps["input"]>;
  meta?: Partial<IFieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  icon?: Omit<IIconProps, "size">;
  iconPosition?: "left" | "right";
  /**
   * Size of the input.
   * label, text, placeholder, and icon are all effected by this property
   * @default 1
   */
  size?: ISize;
  /**
   * @default Color.black
   */
  color?: Color;
  fontFamily?: ITypographyProps["fontFamily"];
  inputStyle?: StyleProp<TextStyle>;
  /**
   * @default "left"
   */
  textAlign?: "center" | "left" | "right";
}

export default function Basic(props: IBasicInputProps) {
  const {
    input,
    meta,
    placeholder,
    style,
    label,
    accessibilityLabel,
    icon,
    iconPosition = "left",
    size = 1,
    color,
    fontFamily = "Inter",
    inputStyle,
    textAlign = "left",
    ...nativeProps
  } = props;

  const { onChange, onBlur, onFocus, value } = input || ({} as any);

  const accessibilityLabelText = accessibilityLabel || label || placeholder;

  if (!accessibilityLabelText) {
    console.warn(
      "You should be passing an accessibilityLabel prop if your not going to define label or placeholder"
    );
  }

  const fontSize = typeSizeMap[size];
  const iconSize = iconSizeMap[size];
  const iconRight = iconPosition === "right";
  const iconMargin = 13;

  return (
    <View style={style}>
      <View
        style={{
          alignItems: textAlign === "right" ? "flex-end" : "flex-start"
        }}
      >
        <Typography
          color={color || Color.primary}
          style={{ fontSize: size ? fontSize - 4 : 12 }}
          fontFamily={fontFamily}
        >
          {label}
        </Typography>
      </View>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1.5,
          borderBottomColor: Color.lightGrey as any,
          paddingVertical: 6,
          flexDirection: iconRight ? "row-reverse" : "row"
        }}
      >
        {icon && (
          <Icon
            name={icon.name}
            size={iconSize}
            color={icon.color}
            onPress={icon.onPress}
            style={
              iconRight
                ? { marginLeft: iconMargin }
                : { marginRight: iconMargin }
            }
          />
        )}
        <TextInput
          {...{ onBlur, onFocus, placeholder, ...nativeProps }}
          accessibilityLabel={accessibilityLabelText}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChange}
          value={value ? value.toString() : undefined}
          style={[
            {
              flex: 1,
              fontSize,
              fontFamily,
              color: (color || Color.black) as any,
              textAlign
            },
            inputStyle
          ]}
        />
      </View>
    </View>
  );
}

type ISizeMap = { [key in ISize]: number };
const typeSizeMap: ISizeMap = {
  "1": 16,
  "2": 24,
  "3": 32
};

const iconSizeMap: ISizeMap = {
  "1": 20,
  "2": 28,
  "3": 36
};
