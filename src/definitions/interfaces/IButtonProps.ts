import {
  StyleProp,
  TouchableOpacityProps,
  TextStyle,
  GestureResponderEvent
} from "react-native";
import { IColor } from "@cohubinc/cohub-utils";

interface IButtonProps extends TouchableOpacityProps {
  elevationLevel?: 0 | 3;
  label: string | any;
  labelStyle?: StyleProp<TextStyle>;
  color?: IColor;
  backgroundColor?: IColor;
  disabled?: boolean;
  onPress: (event?: GestureResponderEvent) => void;
  animated?: boolean;
  size?: number;
  action?: string;
  success?: boolean;
  error?: boolean;
  loading?: boolean;
  raised?: boolean;
  highShadowContrast?: boolean;
}

type TButtonProps<Props = {}> = IButtonProps & Props;

export default TButtonProps;
