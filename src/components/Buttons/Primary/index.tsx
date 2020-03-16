import React, { forwardRef, Ref } from "react";
import { Color } from "@cohubinc/cohub-utils";

import IButtonProps from "src/definitions/interfaces/IButtonProps";
import BasicButton from "../Base";
import { TouchableOpacity } from "react-native";

export interface IPrimaryButtonProps extends Omit<IButtonProps, "color"> {}

const Primary = forwardRef(
  (props: IPrimaryButtonProps, ref: Ref<TouchableOpacity>) => {
    return <BasicButton ref={ref} color={Color.primary} {...props} />;
  }
);

export default Primary;
