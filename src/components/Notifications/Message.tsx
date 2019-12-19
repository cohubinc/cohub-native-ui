import React, { useRef, useEffect, useState, ReactNode } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing,
  View
} from "react-native";
import { Color, ContrastColor } from "@cohubinc/cohub-utils";

import gs from "src/definitions/constants/GlobalStyles";
import { INotification, INotificationType } from ".";
import Typography from "src/components/Typography";

interface IProps {
  notification: INotification;
  dismiss: (notification_id: INotification["id"]) => void;
}

export default function Message({ notification, dismiss }: IProps) {
  const defaultDuration =
    notification.type !== INotificationType.success ? 5000 : 2000;

  const {
    type = INotificationType.success,
    render,
    position = "top",
    isActionRequired = false,
    id,
    title,
    message,
    duration = defaultDuration
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
    }

    return position === "top" ? [-180, 0] : [40, -80];
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

  if (type === INotificationType.custom && render) {
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

  const color = getTextColor(type);
  const maxHeight = 100;
  const MsgText: React.FunctionComponent = ({ children }) => (
    <Typography color={color} style={{ maxHeight }}>
      {children}
    </Typography>
  );

  function renderMessage() {
    if (typeof message === "string") {
      return <MsgText>{message}</MsgText>;
    }

    if (
      Array.isArray(message) &&
      message.every(msg => typeof msg === "string")
    ) {
      return (message as string[]).map(text => {
        return <MsgText key={text}>{text}</MsgText>;
      });
    }

    return message;
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
            <Typography color={color} style={[gs.smallHeadingText]}>
              {title}
            </Typography>
          )}
          <View>{renderMessage()}</View>
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
