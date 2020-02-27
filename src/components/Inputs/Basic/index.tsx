import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  TextInput,
  StyleProp,
  ViewStyle,
  View,
  TextInputProps,
  TextStyle,
  ActivityIndicator
} from "react-native";
import { Color, IColor } from "@cohubinc/cohub-utils";
import Typography, { ITypographyProps } from "src/components/Typography";
import Icon, { IIconProps } from "src/components/Icon";
import Divider from "src/components/Divider";

type INativeProps = Omit<
  TextInputProps,
  "value" | "onChange" | "onBlur" | "onFocus" | "onChangeText" | "style"
>;
type IIcon = Omit<IIconProps, "size">;
type IFieldProps = FieldRenderProps<string, any>;
type IInput = Partial<IFieldProps["input"]>;
type ISize = "small" | "medium" | "large";
export interface IBasicInputProps extends INativeProps {
  placeholder?: string;
  label?: string;
  input?: IInput;
  meta?: Partial<IFieldProps["meta"]>;
  style?: StyleProp<Omit<ViewStyle, "height">>;
  accessibilityLabel?: string;
  icon?: IIcon;
  loading?: boolean;
  showBottomBorder?: boolean;
  iconPosition?: "left" | "right";
  tintColor?: IColor;
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
  inputStyle?: StyleProp<Omit<TextStyle, "height">>;
  /**
   * @default "left"
   */
  textAlign?: "center" | "left" | "right";
  height?: ViewStyle["height"];
}

export default function Basic(props: IBasicInputProps) {
  const {
    input,
    meta,
    placeholder,
    style,
    label,
    tintColor,
    accessibilityLabel,
    loading = false,
    iconPosition = "left",
    size = "small",
    inverted,
    fontFamily = "Inter",
    inputStyle,
    textAlign = "left",
    showBottomBorder = true,
    inputRef,
    height = 40,
    ...nativeProps
  } = props;

  let { icon } = props;

  const { onChange, onBlur, onFocus, value } = input || ({} as IInput);

  const accessibilityLabelText = accessibilityLabel || label || placeholder;

  const showError = meta?.error && meta?.touched;

  let borderColor = Color.lightGrey;
  if (showError) {
    borderColor = inverted ? Color.red200 : Color.red400;
    icon = { name: "error", color: Color.red400 };
  }

  if (!accessibilityLabelText) {
    console.warn(
      "You should be passing an accessibilityLabel prop if your not going to define label or placeholder"
    );
  }

  const fontSize = typeSizeMap[size];
  const iconSize = iconSizeMap[size];
  const iconRight = showError || iconPosition === "right";
  const iconMargin = 13;

  const { style: incomingIconStyle, color: iconColor, ...restIcon } =
    icon || ({} as IIcon);

  const iconStyle = [
    iconRight ? { marginLeft: iconMargin } : { marginRight: iconMargin },
    incomingIconStyle
  ];

  return (
    <View style={[style, { height }]}>
      <View
        style={{
          alignItems: textAlign === "right" ? "flex-end" : "flex-start"
        }}
      >
        <Typography
          color={tintColor ?? (inverted ? Color.trueWhite : Color.primary)}
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
          flexDirection: iconRight ? "row-reverse" : "row",
          alignItems: "center"
        }}
      >
        {loading && (
          <ActivityIndicator color={Color.primaryGreen} style={iconStyle} />
        )}
        {!loading && icon && (
          <Icon
            {...restIcon}
            size={iconSize}
            color={iconColor || (inverted ? Color.trueWhite : Color.black)}
            style={[iconStyle]}
          />
        )}
        <TextInput
          {...nativeProps}
          placeholder={placeholder}
          accessibilityLabel={accessibilityLabelText}
          onBlur={onBlur as any}
          onFocus={onFocus as any}
          placeholderTextColor={Color.grey700}
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
              opacity: inverted ? 0.8 : 1,
              height
            },
            inputStyle
          ]}
        />
      </View>
      {showBottomBorder && (
        <Divider
          color={borderColor}
          style={{
            marginVertical: 0,
            marginTop: dividerMarginTopMap[size],
            opacity: inverted ? 0.4 : 1
          }}
        />
      )}
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
