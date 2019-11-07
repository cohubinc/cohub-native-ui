import { useReducer, useEffect } from "react";
import {
  INotification,
  IAddNotificationPayload,
  IRemoveNotificationPayload
} from ".";
import emitter from "src/helpers/eventEmitter";
import IAction from "src/definitions/interfaces/IAction";
import { TimeElapsedTracker, guid } from "@cohubinc/cohub-utils";

export default function useNotifications() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onShowNotification = (notification: INotification) =>
    dispatch({ type: "ADD", payload: { notification } });
  const onRemoveNotification = (notification_id: INotification["id"]) =>
    dispatch({ type: "REMOVE", payload: { notification_id } });

  useEffect(() => {
    emitter.on("showNotification", onShowNotification);
    emitter.on("removeNotification", onRemoveNotification);
    return () => {
      emitter.removeListener("showNotification", onShowNotification);
      emitter.removeListener("removeNotification", onRemoveNotification);
    };
  }, []);

  return { state, dispatch };
}

const initialState: INotification[] = [];
const tracker = new TimeElapsedTracker();

function reducer(state: INotification[], action: IAction) {
  switch (action.type) {
    case "ADD": {
      const payload: IAddNotificationPayload = action.payload;
      const notEnoughTimeHasElapsed = tracker.elapsedTimeIsLessThan(1000);

      if (notEnoughTimeHasElapsed) return state;

      const newNotif = payload.notification.id
        ? payload.notification
        : { ...payload.notification, id: guid() };

      return [...state, newNotif];
    }
    case "REMOVE": {
      const payload: IRemoveNotificationPayload = action.payload;

      return state.filter(n => n.id !== payload.notification_id);
    }
    default:
      return state;
  }
}
