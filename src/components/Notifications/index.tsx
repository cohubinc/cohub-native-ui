import React from "react";
import Message from "./Message";
import useNotifications from "./useNotifications";
import emitter from "src/helpers/eventEmitter";
import { guid } from "@cohubinc/cohub-utils";

export function Notifications() {
  const { state } = useNotifications();
  console.log({ state, length: state.length });

  return (
    <React.Fragment>
      {state.map(n => (
        <Message
          notification={n}
          dismiss={notification_id => removeNotification(notification_id)}
        />
      ))}
    </React.Fragment>
  );
}

export interface INotification {
  id?: string;
  title?: string;
  type?: INotificationType;
  message: React.ReactNode;
  position?: "top" | "bottom";
  duration?: number;
  isActionRequired?: boolean;
  modal?: boolean;
  render?: (
    notification: INotification,
    onDismiss: () => void
  ) => React.ReactElement | null;
}

export interface IAddNotificationPayload {
  notification: INotification;
}

export interface IRemoveNotificationPayload {
  notification_id: INotification["id"];
}

export enum INotificationType {
  success = "success",
  error = "error",
  custom = "custom"
}

export function showNotification(notification: INotification) {
  if (!notification.id) {
    emitter.emit("showNotification", { ...notification, id: guid() });
  } else {
    emitter.emit("showNotification", notification);
  }
}

export function removeNotification(notification_id: INotification["id"]) {
  if (notification_id) {
    emitter.emit("removeNotification", notification_id);
  }
}

export function showSuccessNotification(notification: INotification) {
  if (!notification.id) {
    emitter.emit("showNotification", {
      ...notification,
      id: guid(),
      type: INotificationType.success
    });
  } else {
    emitter.emit("showNotification", {
      ...notification,
      type: INotificationType.success
    });
  }
}

export function showErrorNotification(notification: INotification) {
  if (!notification.id) {
    emitter.emit("showNotification", {
      ...notification,
      id: guid(),
      type: INotificationType.error
    });
  } else {
    emitter.emit("showNotification", {
      ...notification,
      type: INotificationType.error
    });
  }
}

export function showCustomNotification(
  notification: INotification,
  render: INotification["render"]
) {
  if (!notification.id) {
    emitter.emit("showNotification", {
      ...notification,
      id: guid(),
      type: INotificationType.custom,
      render
    });
  } else {
    emitter.emit("showNotification", {
      ...notification,
      type: INotificationType.custom,
      render
    });
  }
}
