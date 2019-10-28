import { useReducer, useEffect } from "react";
import {
  INotification,
  IAddNotificationPayload,
  IRemoveNotificationPayload
} from ".";
import emitter from "src/helpers/eventEmitter";
import IAction from "../../definitions/interfaces/IAction";

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

function reducer(state: INotification[], action: IAction) {
  switch (action.type) {
    case "ADD": {
      const payload: IAddNotificationPayload = action.payload;

      return [...state, payload.notification];
    }
    case "REMOVE": {
      const payload: IRemoveNotificationPayload = action.payload;

      return state.filter(n => n.id !== payload.notification_id);
    }
    default:
      return state;
  }
}
