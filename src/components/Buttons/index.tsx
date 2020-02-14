import React, { Component } from "react";

import IButtonProps from "src/definitions/interfaces/IButtonProps";

import Base from "./Base";
import Primary from "./Primary";
import OutlineButton from "./Outline";
import Split from "./Split";
import Text from "./Text";

export { IBaseButtonProps } from "./Base";
export { IPrimaryButtonProps } from "./Primary";
export { IOutlineButtonProps } from "./Outline";
export { ISplitButtonProps } from "./Split";
export { ITextButtonProps } from "./Text";

export default class Buttons extends Component<IButtonProps> {
  static Primary = Primary;
  static Outline = OutlineButton;
  static Split = Split;
  static Text = Text;

  render() {
    return <Base {...this.props} />;
  }
}
