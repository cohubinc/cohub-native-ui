import {
  StyleProp,
  TouchableHighlightProps,
  TextStyle,
  GestureResponderEvent
} from "react-native";
import { IColor } from "@cohubinc/cohub-utils";
import { ReactNode } from "react";

interface IButtonProps extends TouchableHighlightProps {
  elevationLevel?: 0 | 3;
  label: ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  color?: IColor;
  backgroundColor?: IColor;
  disabled?: boolean;
  onPress: (event?: GestureResponderEvent) => void;
  animated?: boolean;
  mono?: boolean;
  bold?: boolean;
  size?: number;
  action?: string;
  success?: boolean;
  error?: boolean;
  loading?: boolean;
  raised?: boolean;
  highShadowContrast?: boolean;
  enableHaptics?: boolean;
}

type TButtonProps<Props = {}> = IButtonProps & Props;

export default TButtonProps;
