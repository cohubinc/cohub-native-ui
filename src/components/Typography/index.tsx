import React, { Component } from "react";

import { ITypographyProps } from "./definitions/ITypographyProps";

import {
  SuperTitle,
  Title,
  Subtitle,
  HeadingLarge,
  HeadingSmall,
  HeadingTiny,
  Large,
  Small,
  Tiny,
  Regular
} from "./TypeFaces";

export default class Typography extends Component<ITypographyProps> {
  static SuperTitle = SuperTitle;
  static Title = Title;
  static Subtitle = Subtitle;
  static HeadingLarge = HeadingLarge;
  static HeadingSmall = HeadingSmall;
  static HeadingTiny = HeadingTiny;
  static Large = Large;
  static Small = Small;
  static Tiny = Tiny;

  render() {
    return <Regular {...this.props} />;
  }
}
