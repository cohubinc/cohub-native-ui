import React, { CSSProperties } from "react";

import { size } from "src/helpers/style-utils";
import Icon from "src/components/Icon";

const transition = "0.2s ease-in-out";
const btnInputStyle = {
  ...size(26),
  outline: "none",
  borderRadius: "50%",
  padding: 10,
  transition
};

const expandedInputStyles = {
  outline: "none",
  height: 28,
  width: 120,
  borderRadius: 32,
  padding: "3px 9px",
  transition
};

const defaultState = {
  expanded: false
};
interface IProps {
  name?: string;
  onBlur?: any;
  onChange?: any;
  onFocus?: any;
  className?: string;
  style?: CSSProperties;
}
export default class AddChipInput extends React.Component<
  IProps,
  typeof defaultState
> {
  _input: React.RefObject<HTMLInputElement>;
  state = defaultState;

  constructor(props: IProps) {
    super(props);
    this._input = React.createRef();
  }

  render() {
    const { className, style = {}, ...restProps } = this.props;

    const { expanded } = this.state;

    const defaultIconStyle = {
      position: "absolute",
      cursor: "pointer",
      height: 13,
      transition
    };
    const iconStyles = expanded
      ? {
          ...defaultIconStyle,
          left: 49,
          top: 6,
          transform: "translate(50px, 0) rotate(45deg)"
        }
      : { ...defaultIconStyle, left: 5.3, top: 5.4 };

    const inputRef = this._input.current;

    if (inputRef) {
      expanded ? inputRef.focus() : inputRef.blur();
    }

    const { onBlur, onFocus, onChange, ...rest } = restProps;
    return (
      <div style={{ ...style, position: "relative" }} className={className}>
        <input
          {...rest}
          className="border"
          style={expanded ? expandedInputStyles : btnInputStyle}
          ref={this._input}
          onChange={e => onChange(e.target.value)}
          onFocus={e => {
            onFocus && onFocus(e);
            this.setState({ expanded: true });
          }}
          onBlur={e => {
            onBlur && onBlur(e);
            this.setState({ expanded: false });
          }}
        />

        <Icon.Add
          size={16.5}
          onPress={this.toggleState}
          style={iconStyles as any}
        />
      </div>
    );
  }

  toggleState = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  };
}
