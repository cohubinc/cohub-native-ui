export interface INotification {
  id?: string;
  title?: string;
  type?: INotificationType;
  message: React.ReactNode | string[];
  position?: "top" | "bottom";
  duration?: number;
  isActionRequired?: boolean;
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
  custom = "custom",
  info = "info",
}
