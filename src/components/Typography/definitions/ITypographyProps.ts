import { TextProps, StyleProp, TextStyle } from "react-native";
import { IColor } from "@cohubinc/cohub-utils";
import { IFontFamily } from "src/definitions/types/IFontFamily";
type TextStyleWithoutColor = StyleProp<Omit<TextStyle, "color">>;
interface ITextProps extends Omit<TextProps, "style"> {
  style?: TextStyleWithoutColor;
}

export interface ITypographyProps extends ITextProps {
  fontFamily?: IFontFamily;
  /** React Children nodes are required */
  children: React.ReactNode;
  /** Text can be the muted color */
  muted?: boolean;

  /** Text can be display: block */
  block?: boolean;

  /** Font weight */
  weight?:
    | "bold"
    | "normal"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;

  /** Text can be bold */
  bold?: boolean;

  /** Text can be monospaced */
  mono?: boolean;

  /** Text can be italic */
  italicize?: boolean;

  /** Easily make the text the default light color */
  light?: boolean;

  /** Use error styles */
  error?: boolean;

  /** Text color for dark backgrounds */
  inverted?: boolean;

  color?: IColor;

  uppercase?: boolean;

  alignment?: "left" | "right" | "center" | "justify" | "auto";

  kerning?: number;

  "data-qa"?: string;
}
