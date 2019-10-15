import React, { Component } from "react";

import { INativeTypographyProps } from "./definitions/ITypographyProps.native";

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

export default class Typography extends Component<INativeTypographyProps> {
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
