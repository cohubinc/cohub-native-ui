import React from "react";
import {
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  TransformsStyle,
  TouchableWithoutFeedbackProps,
  Insets
} from "react-native";
import { IColor } from "@cohubinc/cohub-utils";

import logError from "src/helpers/logError";

import icons, { TIconName } from "./Icons";
export { iconNames } from "./Icons";

type ITouchableProps = Pick<
  TouchableWithoutFeedbackProps,
  "onPress" | "onLongPress" | "onPressOut"
>;
export interface IIconProps extends ITouchableProps {
  name: TIconName;
  size?: number;
  color?: IColor;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  transform?: TransformsStyle;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  accessibilityLabel?: string;
  hitSlop?: Insets | number;
}

const DefaultIcon = (props: IIconProps) => {
  const Ico = icons[props.name];

  if (!Ico) {
    logError(`${props.name} Icon does not exist`);
    return null;
  }

  return <Ico {...props} />;
};

const buildIcon = (name: TIconName) => (props: Omit<IIconProps, "name">) => (
  <DefaultIcon name={name} {...props} />
);

export default function Icon(props: IIconProps) {
  return <DefaultIcon {...props} />;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// You might think we should define the properties below programmatically.                           //
// I agree but as far as I can tell there isn't a way to do it without losing the type information.  //
///////////////////////////////////////////////////////////////////////////////////////////////////////
Icon.Add = buildIcon("add");
Icon.AddUser = buildIcon("addUser");
Icon.AddUsers = buildIcon("addUsers");
Icon.Archive = buildIcon("archive");
Icon.ArrowDown = buildIcon("arrowDown");
Icon.ArrowLeft = buildIcon("arrowLeft");
Icon.ArrowRight = buildIcon("arrowRight");
Icon.ArrowUp = buildIcon("arrowUp");
Icon.Asterisk = buildIcon("asterisk");
Icon.Back = buildIcon("back");
Icon.Bell = buildIcon("bell");
Icon.BoxAdd = buildIcon("boxAdd");
Icon.Calculator = buildIcon("calculator");
Icon.Calendar = buildIcon("calendar");
Icon.CaretDown = buildIcon("caretDown");
Icon.Checkmark = buildIcon("checkmark");
Icon.ChevronDown = buildIcon("chevronDown");
Icon.ChevronLeft = buildIcon("chevronLeft");
Icon.ChevronRight = buildIcon("chevronRight");
Icon.Circle = buildIcon("circle");
Icon.CircleCheck = buildIcon("circleCheck");
Icon.CirclePlus = buildIcon("circlePlus");
Icon.CirclePlusInverted = buildIcon("circlePlusInverted");
Icon.CircleRemove = buildIcon("circleRemove");
Icon.Close = buildIcon("close");
Icon.CollectionDots = buildIcon("collectionDots");
Icon.Columns = buildIcon("columns");
Icon.ControlPanel = buildIcon("controlPanel");
Icon.Dashboard = buildIcon("dashboard");
Icon.Edit = buildIcon("edit");
Icon.Ellipsis = buildIcon("ellipsis");
Icon.Error = buildIcon("error");
Icon.Eye = buildIcon("eye");
Icon.Filter = buildIcon("filter");
Icon.Flashlight = buildIcon("flashlight");
Icon.Forward = buildIcon("forward");
Icon.Laptop = buildIcon("laptop");
Icon.List = buildIcon("list");
Icon.Menu = buildIcon("menu");
Icon.Print = buildIcon("print");
Icon.Report = buildIcon("report");
Icon.Rows = buildIcon("rows");
Icon.Sales = buildIcon("sales");
Icon.Save = buildIcon("save");
Icon.Scales = buildIcon("scales");
Icon.Search = buildIcon("search");
Icon.Shipping = buildIcon("shipping");
Icon.TagDollar = buildIcon("tagDollar");
Icon.Trash = buildIcon("trash");
Icon.Triangle = buildIcon("triangle");
Icon.TriangleDown = buildIcon("triangleDown");
Icon.TripleDotsVertical = buildIcon("tripleDotsVertical");
Icon.UserGroup = buildIcon("userGroup");
Icon.User = buildIcon("user");
Icon.Subtract = buildIcon("subtract");
