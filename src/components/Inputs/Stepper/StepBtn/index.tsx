import React, { useState, useEffect } from "react";
import { TIconName } from "src/components/Icon/Icons";
import styled from "styled-components/native";

import Color from "src/definitions/enums/Color";
import Icon from "src/components/Icon";

type IBorderSide = "Left" | "Right";
interface IStepBtnProps {
  iconName: TIconName;
  borderSide: IBorderSide;
  disabled?: boolean;
  onPress: () => void;
}
const StepBtnContainer = styled.View`
  flex: 1;
  border-color: ${Color.lightGrey};
  margin: 5px 0;
`;
const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export default function StepBtn(props: IStepBtnProps) {
  const { onPress, iconName, borderSide, disabled } = props;
  const borderStyle = { [`border${borderSide}Width`]: 1 };
  const sharedProps = {
    onPress,
    disabled,
    onLongPress: () => setPressing(true),
    onPressOut: () => setPressing(false)
  };

  const [pressing, setPressing] = useState(false);
  useEffect(() => {
    if (!pressing) return;

    const id = setInterval(onPress, 50);

    return () => {
      clearInterval(id);
    };
  }, [pressing]);

  return (
    <StepBtnContainer style={borderStyle}>
      <Btn
        style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}
        {...sharedProps}
      >
        <Icon name={iconName} color={Color.black} disabled={disabled} />
      </Btn>
    </StepBtnContainer>
  );
}
