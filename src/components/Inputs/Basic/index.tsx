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
import Color, { ContrastColor } from "src/definitions/enums/Color";
import Typography, { ITypographyProps } from "src/components/Typography";
import Icon, { IIconProps } from "src/components/Icon";
import Divider from "src/components/Divider";

type INativeProps = Omit<
  TextInputProps,
  "value" | "onChange" | "onBlur" | "onFocus" | "onChangeText" | "style"
>;
type IFieldProps = FieldRenderProps<string, any>;
type ISize = "small" | "medium" | "large";
export interface IBasicInputProps extends INativeProps {
  placeholder?: string;
  label?: string;
  input?: Partial<IFieldProps["input"]>;
  meta?: Partial<IFieldProps["meta"]>;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  icon?: Omit<IIconProps, "size">;
  iconPosition?: "left" | "right";
  inputRef?: React.RefObject<TextInput>;
  /**
   * Size of the input.
   * label, text, placeholder, and icon are all effected by this property
   * @default 1
   */
  size?: ISize;
  /**
   * Is this input being used over a colored or black background?
   */
  inverted?: boolean;
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
    size = "small",
    inverted,
    fontFamily = "Inter",
    inputStyle,
    textAlign = "left",
    inputRef,
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
          color={inverted ? Color.trueWhite : Color.primary}
          style={{
            fontSize: size ? fontSize - 4 : 12
          }}
          fontFamily={fontFamily}
        >
          {label}
        </Typography>
      </View>
      <View
        style={{
          width: "100%",
          paddingVertical: 6,
          flexDirection: iconRight ? "row-reverse" : "row"
        }}
      >
        {icon && (
          <Icon
            name={icon.name}
            size={iconSize}
            color={icon.color || inverted ? Color.trueWhite : Color.black}
            onPress={icon.onPress}
            style={[
              iconRight
                ? { marginLeft: iconMargin }
                : { marginRight: iconMargin }
            ]}
          />
        )}
        <TextInput
          {...{ onBlur, onFocus, placeholder, ...nativeProps }}
          accessibilityLabel={accessibilityLabelText}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChange}
          ref={inputRef}
          value={value ? value.toString() : undefined}
          style={[
            {
              flex: 1,
              fontSize,
              textAlign,
              fontFamily,
              color: inverted ? Color.trueWhite : Color.black,
              opacity: inverted ? 0.8 : 1
            },
            inputStyle
          ]}
        />
      </View>
      <Divider
        style={{
          marginVertical: 0,
          marginTop: dividerMarginTopMap[size],
          borderColor: inverted ? Color.trueWhite : Color.lightGrey,
          opacity: inverted ? 0.4 : 1
        }}
      />
    </View>
  );
}

type ISizeMap = { [key in ISize]: number };
const typeSizeMap: ISizeMap = {
  small: 16,
  medium: 24,
  large: 32
};

const iconSizeMap: ISizeMap = {
  small: 20,
  medium: 28,
  large: 36
};

const dividerMarginTopMap: ISizeMap = {
  small: 2,
  medium: 3,
  large: 5
};
