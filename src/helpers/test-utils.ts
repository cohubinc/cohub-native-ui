import { StyleProp, ViewStyle } from "react-native";

export function isLineLoaderVisible(loader: any) {
  return !(loader?.props?.style?.pop().opacity === 0);
}

export function findActiveStyle(
  style: StyleProp<ViewStyle>,
  property: string
): string | undefined {
  if (!style) {
    return;
  }

  if (Array.isArray(style)) {
    return findActiveStyle(
      style.reverse().find((s) => !!findActiveStyle(s, property)),
      property
    );
  }

  if (typeof style === "object") {
    return (style as any)[property as any];
  }
}
