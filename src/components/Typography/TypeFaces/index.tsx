import { typographyFactory } from "./typographyFactory";

export const SuperTitle = typographyFactory({
  "data-qa": "page-supertitle",
  style: { fontSize: 48 },
});

export const Title = typographyFactory({
  "data-qa": "page-title",
  style: { fontSize: 36 },
});

export const Subtitle = typographyFactory({
  "data-qa": "page-subtitle",
  style: { fontSize: 30 },
});

export const HeadingLarge = typographyFactory({
  "data-qa": "heading-large",
  style: { fontSize: 24 },
});

export const HeadingSmall = typographyFactory({
  "data-qa": "heading-small",
  style: { fontSize: 20 },
});

export const HeadingTiny = typographyFactory({
  "data-qa": "heading-tiny",
  style: { fontSize: 18 },
});

export const Large = typographyFactory({ style: { fontSize: 16 } });

export const Regular = typographyFactory({
  style: { fontSize: 14 },
});

export const Small = typographyFactory({ style: { fontSize: 12 } });

export const Tiny = typographyFactory({ style: { fontSize: 10.2 } });
