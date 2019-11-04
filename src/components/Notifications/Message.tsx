import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Easing,
  View
} from "react-native";
import { INotification, INotificationType } from ".";
import gs from "../../definitions/constants/GlobalStyles";
import Color, { ContrastColor } from "../../definitions/enums/Color";

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
    id,
    title,
    message,
    duration = notification.type &&
    notification.type !== INotificationType.success
      ? 5000
      : 2000
  } = notification;
  const [notificationHeight, setNotificationHeight] = useState(0);
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

  const getOutputRange = () => {
    if (notificationHeight) {
      return position === "top"
        ? [notificationHeight * -2, 0]
        : [notificationHeight, notificationHeight * -1.5];
    } else {
      return position === "top" ? [-180, 0] : [40, -80];
    }
  };

  const animated = {
    transform: [
      {
        translateY: transition.current.interpolate({
          inputRange: [0, 1],
          outputRange: getOutputRange()
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
        <View
          onLayout={({ nativeEvent }) =>
            setNotificationHeight(nativeEvent.layout.height)
          }
        >
          {render(notification, onDismiss)}
        </View>
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
      <View
        onLayout={({ nativeEvent }) =>
          setNotificationHeight(nativeEvent.layout.height)
        }
      >
        <TouchableOpacity onPress={onDismiss} style={styles.button}>
          {title && (
            <Text style={[gs.smallHeadingText, styles.text]}>{title}</Text>
          )}
          {typeof message === "string" ? (
            <Text style={[styles.text]} numberOfLines={5}>
              {message}
            </Text>
          ) : (
            message
          )}
        </TouchableOpacity>
      </View>
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
      backgroundColor: getBackgroundColor(type)
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
      color: getTextColor(type),
      maxHeight: 100
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      paddingHorizontal: 18,
      paddingVertical: 10
    },
    actionLabel: {
      paddingHorizontal: 10
    }
  });

const getBackgroundColor = (type: INotificationType) => {
  switch (type) {
    case INotificationType.success:
      return Color.primaryGreen;
    case INotificationType.error:
      return Color.primaryRed;
    case INotificationType.info:
      return Color.black;
    default:
      return Color.black;
  }
};

const getTextColor = (type: INotificationType) => {
  switch (type) {
    case INotificationType.success:
      return ContrastColor[Color.primaryGreen];
    case INotificationType.error:
      return ContrastColor[Color.primaryRed];
    case INotificationType.info:
      return ContrastColor[Color.black];
    default:
      return ContrastColor[Color.black];
  }
};
