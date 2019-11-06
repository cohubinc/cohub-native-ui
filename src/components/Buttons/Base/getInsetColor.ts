import lowerFirst from "lodash/lowerFirst";
import findKey from "lodash/findKey";

import logError from "src/helpers/logError";
import { Color } from "@cohubinc/cohub-utils";

// Calculate the inset color by finding the background color then dropping down two color shades
export function getInsetColor(backgroundColor: Color) {
  try {
    const color = findKey(Color, value => backgroundColor === value) as string;

    const colorLevel = color.replace(/^\D+/g, "");
    const colorName = lowerFirst(color.split(colorLevel).filter(n => n)[0]);
    const insetColorLevel = parseInt(colorLevel) - 200;
    const insetColorName = `${colorName}${insetColorLevel}`;
    const insetColorValue = (Color as any)[insetColorName];

    if (!insetColorValue) {
      logError(
        `Couldn't find an inset color. Please add ${insetColorName} to Color Enum`
      );
    }

    return insetColorValue;
  } catch (err) {
    logError(err.message);

    return "transparent";
  }
}
