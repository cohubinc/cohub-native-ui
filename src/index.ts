// Components
// export { default as Avatar, IAvatarProps } from "src/components/Avatar";
export { default as BoxShadow } from "src/definitions/enums/BoxShadow";
export { default as Buttons } from "src/components/Buttons";
// export { IFabRefObject } from "src/components/Buttons/FloatingActionButton";
export * from "src/components/Buttons";
// export {
//   default as Card,
//   IVerticalCardProps,
//   IHorizontalCardProps
// } from "src/components/Card";
export { default as Chip, TChipProps } from "src/components/Chip";
export { default as Color, ContrastColor } from "src/definitions/enums/Color";
export { default as Divider } from "src/components/Divider";
export {
  default as FormatMoney,
  IFormatMoneyProps
} from "src/components/FormatMoney";
export {
  default as FormatNumber,
  IFormatNumberProps
} from "src/components/FormatNumber";
export {
  default as FormatPercent,
  IFormatPercentProps
} from "src/components/FormatPercent";
export {
  default as FormatWeight,
  IFormatWeightProps
} from "src/components/FormatWeight";
export {
  default as FormGroup,
  TFormGroupProps
} from "src/components/Form/FormGroup";
export { default as Icon, IIconProps } from "src/components/Icon";
export { iconNames } from "src/components/Icon/Icons";
export { default as Inputs } from "src/components/Inputs";
// export * from "src/components/Inputs";
// export { default as Loader, ILoaderProps } from "src/components/Loader";
// export { default as Modal, IModalProps } from "src/components/Modal";

// TODO: find out what "Menu" is and if we need it. If not, nuke it
// export { default as Menu, IMenuProps } from "src/components/Menu";
// export {
//   default as RenderBoolean,
//   IRenderBooleanProps
// } from "src/components/RenderBoolean";
export { default as Segment, ISegmentProps } from "src/components/Segment";
export {
  default as Statistic,
  IStatisticProps
} from "src/components/Statistic";
// export { default as Tabs, ITabsProps } from "src/components/Tabs";
export { default as Typography } from "src/components/Typography";
export {
  INativeTypographyProps
} from "src/components/Typography/definitions/ITypographyProps.native";

// // Helpers
// export { default as logError } from "src/helpers/logError";
// export * from "src/helpers/guid";
// export { default as renderDate, TDateFormat } from "src/helpers/render-dates";
// export * from "src/helpers/style-utils";
// export * from "src/helpers/ui";
// import * as InputValidationsToExport from "src/helpers/input-validations";
// export const inputValidations = InputValidationsToExport;
// export { default as useMediaQueries } from "src/hooks/useMediaQueries";

// Helpers
export { default as logError } from "src/helpers/logError";
export * from "src/helpers/guid";
export { default as renderDate, TDateFormat } from "src/helpers/render-dates";
export * from "src/helpers/ui";
import * as InputValidationsToExport from "src/helpers/input-validations";
export const inputValidations = InputValidationsToExport;
