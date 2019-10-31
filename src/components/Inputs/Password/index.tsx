import React, { useState } from "react";
import { IBasicInputProps } from "../Basic";
import { Inputs } from "src";

export interface IPasswordInputProps
  extends Omit<IBasicInputProps, "icon" | "iconPosition"> {}

function Password(props: IPasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Inputs.Basic
      {...props}
      icon={{
        name: "eye",
        onPress: () => setVisible(!visible)
      }}
      iconPosition="right"
      secureTextEntry={!visible}
    />
  );
}

export default Password;
