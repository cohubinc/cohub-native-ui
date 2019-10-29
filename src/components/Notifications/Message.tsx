import React, { useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Easing
} from "react-native";
import { INotification, INotificationType } from ".";
import gs from "../../definitions/constants/GlobalStyles";
import Color, { ContrastColor } from "../../definitions/enums/Color";
import { guid } from "@cohubinc/cohub-utils";
interface IProps {
  notification: INotification;
  dismiss: (notification_id: INotification["id"]) => void;
}

export default function Message({ notification, dismiss }: IProps) {
  const {
    type = INotificationType.success,
    render,
    position = "top",
    isActionRequired = false,
    id = guid(),
    title,
    message,
    duration = notification.type &&
    notification.type !== INotificationType.success
      ? 5000
      : 2000
  } = notification;

  const transition = useRef<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(transition.current, {
      toValue: 1,
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true
    }).start(() => {
      if (!isActionRequired) {
        setTimeout(onDismiss, duration);
      }
    });
  }, []);

  const onDismiss = () => {
    Animated.timing(transition.current, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true
    }).start(() => {
      dismiss(id);
    });
  };

  const styles = makeStyles(type);

  const animated = {
    transform: [
      {
        translateY: transition.current.interpolate({
          inputRange: [0, 1],
          outputRange: position === "top" ? [-180, 0] : [100, -80]
        })
      }
    ]
  };

  if (type === INotificationType.custom && !!render) {
    return (
      <Animated.View
        style={[
          gs.boxShadow,
          { shadowOpacity: 0.9 },
          styles.customContainer,
          position === "top" ? styles.top : styles.bottom,
          animated
        ]}
      >
        {render(notification, onDismiss)}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        gs.boxShadow,
        { shadowOpacity: 0.9 },
        styles.container,
        position === "top" ? styles.top : styles.bottom,
        animated
      ]}
    >
      <TouchableOpacity onPress={onDismiss} style={styles.button}>
        {title && (
          <Text style={[gs.smallHeadingText, styles.text]}>{title}</Text>
        )}
        {typeof message === "string" ? <Text>{message}</Text> : message}
      </TouchableOpacity>
    </Animated.View>
  );
}

const makeStyles = (type: INotificationType) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      alignSelf: "center",
      minHeight: 40,
      maxHeight: 120,
      minWidth: 200,
      maxWidth: 600,
      zIndex: 999,
      borderRadius: 4,
      backgroundColor: (type === INotificationType.success
        ? Color.primaryGreen
        : Color.primaryRed) as any
    },
    customContainer: {
      position: "absolute",
      zIndex: 999,
      alignSelf: "center"
    },
    top: {
      top: 56
    },
    bottom: {
      bottom: 0
    },
    text: {
      color:
        type === INotificationType.success
          ? ContrastColor[Color.primaryGreen]
          : ContrastColor[Color.primaryRed]
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      paddingHorizontal: 18
    },
    actionLabel: {
      paddingHorizontal: 10
    }
  });
