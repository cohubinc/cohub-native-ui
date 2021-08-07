import React from "react";
import Message from "./Message";
import useNotifications from "./useNotifications";
import emitter from "src/helpers/eventEmitter";
import { INotification, INotificationType } from "./types";

export * from "./types";

export function Notifications() {
  const { state } = useNotifications();

  return (
    <React.Fragment>
      {state.map((n) => (
        <Message
          key={n.id}
          notification={n}
          dismiss={(notification_id) => removeNotification(notification_id)}
        />
      ))}
    </React.Fragment>
  );
}

export function showNotification(notification: INotification) {
  emitter.emit("showNotification", notification);
}

export function removeNotification(notification_id: INotification["id"]) {
  if (notification_id) {
    emitter.emit("removeNotification", notification_id);
  }
}

export function showSuccessNotification(
  notification: Omit<INotification, "type">
) {
  emitter.emit("showNotification", {
    ...notification,
    type: INotificationType.success,
  });
}

export function showErrorNotification(
  notification: Omit<INotification, "type">
) {
  emitter.emit("showNotification", {
    ...notification,
    type: INotificationType.error,
  });
}

export function showInfoNotification(
  notification: Omit<INotification, "type">
) {
  emitter.emit("showNotification", {
    ...notification,
    type: INotificationType.info,
  });
}

export function showCustomNotification(
  notification: Omit<INotification, "type" | "render">,
  render: INotification["render"]
) {
  emitter.emit("showNotification", {
    ...notification,
    type: INotificationType.custom,
    render,
  });
}
