import Color from "../../../definitions/enums/Color";
import { TextProps } from "react-native";

export interface ITypographyProps extends TextProps {
  fontFamily?: "Roboto Mono" | "MillerDisplay" | "Inter";
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

  color?: Color;

  uppercase?: boolean;

  alignment?: "left" | "right" | "center" | "justify" | "auto";

  kerning?: number;

  "data-qa"?: string;
}
