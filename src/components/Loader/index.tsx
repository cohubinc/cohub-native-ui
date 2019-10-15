import React, { CSSProperties } from "react";

import Color from "src/definitions/enums/Color";
import { Fade } from "src/components/Transition";

import "./loader.scss";

export interface ILoaderProps {
  /**
   * The loader can take up the whole screen inside of the Backdrop overlay
   */
  fullScreen?: boolean;

  asOverlay?: boolean;
  /**
   * To show or not to show
   */
  show?: boolean;

  /**
   * Styles that will be applied to the root element
   */
  style?: CSSProperties;
  size?: number;
}

export default function Loader({
  fullScreen,
  show = true,
  asOverlay,
  style,
  size = 30
}: ILoaderProps) {
  if (asOverlay) {
    return (
      <Fade show={show}>
        <div
          className="absolute flex justify-center items-center w-100 h-100"
          style={{ background: Color.darkOverlay as any, ...style }}
        >
          <ShrinkGrowLoader dotSize={size} />
        </div>
      </Fade>
    );
  }

  return (
    <Fade show={show}>
      <ShrinkGrowLoader dotSize={size} />
    </Fade>
  );
}

const ShrinkGrowLoader = ({ dotSize }: { dotSize: number }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="dot1"
        style={{ borderRadius: "50%", width: dotSize, height: dotSize }}
      />
      <div
        className="dot2"
        style={{ borderRadius: "50%", width: dotSize, height: dotSize }}
      />
    </div>
  );
};
