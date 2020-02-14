import {
  StyleProp,
  TouchableHighlightProps,
  TextStyle,
  GestureResponderEvent,
  ViewStyle
} from "react-native";
import { IColor } from "@cohubinc/cohub-utils";
import { ReactNode } from "react";
import { ITypographyProps } from "src/components/Typography";

interface INativeStyleProp
  extends Omit<TouchableHighlightProps, "style" | "children"> {
  style?: StyleProp<
    Omit<ViewStyle, "position" | "borderColor" | "boorsd" | "width" | "height">
  >;
}

interface ILableStyle extends Omit<TextStyle, "fontFamily"> {
  fontFamily?: ITypographyProps["fontFamily"];
}

interface IButtonProps extends INativeStyleProp {
  elevationLevel?: 0 | 3;
  label: ReactNode;
  labelStyle?: ILableStyle;
  color?: IColor;
  backgroundColor?: IColor;
  disabled?: boolean;
  onPress: (event?: GestureResponderEvent) => void;
  mono?: boolean;
  bold?: boolean;
  size?: number;
  action?: string;
  success?: boolean;
  loading?: boolean;
  raised?: boolean;
  highShadowContrast?: boolean;
  enableHaptics?: boolean;
  absolutePosition?: Pick<ViewStyle, "top" | "bottom" | "left" | "right">;
  loaderColor?: IColor;
  borderColor?: IColor;
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
}

type TButtonProps<Props = {}> = IButtonProps & Props;

export default TButtonProps;
