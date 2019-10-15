import {
  StyleProp,
  TouchableOpacityProps,
  TextStyle,
  GestureResponderEvent
} from "react-native";
import Color from "../../definitions/enums/Color";

interface IButtonProps extends TouchableOpacityProps {
  label: string | any;
  labelStyle?: StyleProp<TextStyle>;
  color?: Color;
  backgroundColor?: Color;
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
