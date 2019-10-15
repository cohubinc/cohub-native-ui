import React, { CSSProperties } from "react";
import Color from "src/definitions/enums/Color";
import Segment from "./Segment";

export interface ISplitButtonProps {
  labels: string[];
  selectedIndex?: number;
  onChange: (index: number) => void;
  segmentStyle?: CSSProperties;
  backgroundColor?: Color;
  color?: Color;
  style?: CSSProperties;
  className?: string;
}

export default function SplitButton(props: ISplitButtonProps) {
  const {
    labels,
    style,
    className,
    segmentStyle,
    onChange,
    selectedIndex,
    color = Color.grey500,
    backgroundColor = Color.outlineGrey
  } = props;

  const numBtns = labels.length;

  return (
    <div
      {...{ className }}
      style={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(${numBtns}, 1fr)`,
        backgroundColor: backgroundColor as any,
        padding: "0.5rem",
        borderRadius: "4px",
        ...style
      }}
    >
      {labels.map((label, index) => (
        <Segment
          key={label}
          color={color}
          backgroundColor={backgroundColor}
          style={segmentStyle}
          onClick={() => onChange(index)}
          selected={selectedIndex === index}
        >
          {label}
        </Segment>
      ))}
    </div>
  );
}
