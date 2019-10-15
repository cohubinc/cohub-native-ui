import React, { PureComponent } from "react";
import styled from "styled-components/native";

import Color from "src/definitions/enums/Color";

import { IIconProps } from "..";

interface IProps {
  children: (props: { color: Color; size: number }) => JSX.Element;
  color?: Color;
}

export type IWrapperProps = IProps & IIconProps;

class IconWrapper extends PureComponent<IWrapperProps> {
  render() {
    const {
      children,
      color = Color.grey500,
      size = 24,
      disabled,
      onPress,
      style
    } = this.props;

    const IconWrapperContainer = styled.TouchableHighlight`
      width: ${size};
      height: ${size};
      opacity: ${disabled ? 0.3 : 1};
    `;

    const IconPositioner = styled.View`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `;

    return (
      <IconWrapperContainer
        style={style}
        onPress={disabled ? undefined : onPress}
      >
        <IconPositioner>{children({ color, size })}</IconPositioner>
      </IconWrapperContainer>
    );
  }
}

export default IconWrapper;
