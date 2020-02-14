import React from "react";
import { Color } from "@cohubinc/cohub-utils";

import IButtonProps from "src/definitions/interfaces/IButtonProps";
import BasicButton from "../Base";

export type IPrimaryButtonProps = Omit<IButtonProps, "color">;

export default function Primary(props: IPrimaryButtonProps) {
  return <BasicButton color={Color.primary} {...props} />;
}
