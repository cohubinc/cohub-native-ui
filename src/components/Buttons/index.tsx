import React, { Component } from "react";

import Button from "./Base";
import Blank from "./Blank";
import OutlineButton from "./Outline";
import { Ghost, PrimaryGhostButton, CancelGhostButton } from "./Ghost";
import Text from "./Text";
import IButtonProps from "../../definitions/interfaces/IButtonProps";

import Primary from "./Primary";
// import Secondary from "./Secondary";
// import Info from "./Info";
// import Cancel from "./Cancel";
// import Dropdown from "./Dropdown";
// import FloatingActionButton from "./FloatingActionButton";
import Split from "./Split";

// export { TBlankButtonProps } from "./Blank";
// export { TPrimaryButtonProps } from "./Primary";
// export { TOutlineButtonProps } from "./Outline";
// export { TGhostButtonProps } from "./Ghost";
// export { TTextButtonProps } from "./Text";
// export { IDropdownButtonProps } from "./Dropdown";
// export { TFloatingActionButtonProps } from "./FloatingActionButton";
// export { ISplitButtonProps } from "./Split";

export default class Buttons extends Component<IButtonProps> {
  static Base = Button;
  static Primary = Primary;
  // static Secondary = Secondary;
  // static Info = Info;
  // static Cancel = Cancel;
  static Outline = OutlineButton;
  // static Ghost = Ghost;
  // static PrimaryGhost = PrimaryGhostButton;
  // static CancelGhost = CancelGhostButton;

  // static Dropdown = Dropdown;

  // static Text = Text;

  // static Blank = Blank;

  // static FloatingAction = FloatingActionButton;

  static Split = Split;

  render() {
    return <Buttons.Primary {...this.props} />;
  }
}
