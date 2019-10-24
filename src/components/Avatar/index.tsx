import React, { PureComponent } from "react";
import Icon from "../Icon";

export interface IAvatarProps {
  src: string | null | undefined;
  className?: string;
  name?: string | null;
  size?: number;
}

export default class Avatar extends PureComponent<IAvatarProps> {
  static defaultProps: Partial<IAvatarProps> = {
    size: 50
  };

  render() {
    const { src, name, size, className } = this.props;
    const avatarStyle = {
      borderRadius: "50%",
      backgroundColor: "var(--bf-green)",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };

    if (src) {
      return (
        <div
          // className={`${styles.Avatar} ${className}`}
          style={{ width: size, height: size }}
        >
          <img src={src} style={avatarStyle} />
        </div>
      );
    } else if (name) {
      let firstInitial;
      let lastInital;
      const [firstName, lastName] = name.split(" ");

      if (firstName) {
        firstInitial = firstName.substring(0, 1);
      }

      if (lastName) {
        lastInital = lastName.substring(0, 1);
      }

      const style = {
        ...avatarStyle,
        fontWeight: 400
      };

      return (
        <div {...{ className, style }}>
          <div>
            {firstInitial}
            {lastInital}
          </div>
        </div>
      );
    } else {
      return (
        <div className={className}>
          <Icon.User size={size} />
        </div>
      );
    }
  }
}
