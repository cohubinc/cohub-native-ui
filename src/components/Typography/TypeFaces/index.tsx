import { typographyFactory } from "./typographyFactory";

import { ITypographyProps } from "../definitions/ITypographyProps";

export const SuperTitle = typographyFactory({
  "data-qa": "page-supertitle",
  fontSize: 48
});

export const Title = typographyFactory({
  "data-qa": "page-title",
  fontSize: 36
});

export const Subtitle = typographyFactory({
  "data-qa": "page-subtitle",
  fontSize: 30
});

export const HeadingLarge = typographyFactory({
  "data-qa": "heading-large",
  fontSize: 24
});

export const HeadingSmall = typographyFactory({
  "data-qa": "heading-small",
  fontSize: 20
});

export const HeadingTiny = typographyFactory({
  "data-qa": "heading-tiny",
  fontSize: 18
});

export const Large = typographyFactory({ fontSize: 16 });

export const Regular = (props: ITypographyProps) =>
  typographyFactory({
    fontSize: 14
  })(props);

export const Small = typographyFactory({ fontSize: 12 });

export const Tiny = typographyFactory({ fontSize: 10.2 });
