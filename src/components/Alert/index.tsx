import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import { Color } from "@cohubinc/cohub-utils";

import Typography from "src/components/Typography";

export interface IAlertProps extends ViewProps {
  traceProp?: any;
  centerAlign?: boolean;
  info?: boolean;
  success?: boolean;
  error?: boolean;
  message?: ReactNode | string[];
}

export function Alert(props: IAlertProps) {
  const {
    style,
    error,
    message,
    traceProp,
    success,
    info,
    centerAlign,
    ...rest
  } = props;

  let backgroundColor: any = "#f8f8f9";
  let color: any = "rgba(0,0,0,.87)";

  if (error) {
    color = Color.red800;
    backgroundColor = Color.red100;
  } else if (success) {
    color = Color.green900;
    backgroundColor = Color.green100;
  } else if (info) {
    color = Color.blue800;
    backgroundColor = Color.blue100;
  }

  const AlertText = ({ children }: { children: string }) => (
    <Typography.Small color={color}>{children}</Typography.Small>
  );
  function renderChildren() {
    if (typeof message === "string") {
      return <AlertText>{message}</AlertText>;
    }

    if (
      Array.isArray(message) &&
      message.every(msg => typeof msg === "string")
    ) {
      return (message as string[]).map(text => {
        return <AlertText key={text}>{text}</AlertText>;
      });
    }

    return message;
  }

  return (
    <View
      style={[
        {
          flexDirection: centerAlign ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderRadius: 4,
          backgroundColor
        },
        style
      ]}
      {...rest}
    >
      <View>{renderChildren()}</View>
    </View>
  );
}
