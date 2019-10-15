import React, { CSSProperties, ReactNode, useEffect } from "react";
import ReactResponsiveModal from "react-responsive-modal";

import Color from "src/definitions/enums/Color";

import "./Backdrop.scss";
import Svg, { Path } from "react-native-svg";

export interface IBackdropProps {
  open: boolean;
  onClose?: () => void;
  showCloseIcon?: boolean;
  containerClass?: string;
  style?: CSSProperties;
  children?: ReactNode;
  focusTrapped: boolean;
}

export default function Backdrop(props: IBackdropProps) {
  const {
    children,
    onClose = () => null,
    showCloseIcon = false,
    containerClass = "",
    style,
    focusTrapped = true,
    open = true,
    ...rest
  } = props;

  function setBlurState() {
    open ? addBlurClass() : removeBlurClass();
  }

  // Set blur state on mount and any time open changes
  useEffect(() => {
    setBlurState();

    return removeBlurClass;
  }, [open]);

  return (
    <ReactResponsiveModal
      {...rest}
      {...{ open, focusTrapped, onClose }}
      closeOnEsc
      closeOnOverlayClick
      classNames={{
        overlay: `CohubBackdrop ${containerClass}`,
        modal: "modal",
        closeButton: "closeButton"
      }}
      showCloseIcon={showCloseIcon}
      onOverlayClick={onClose}
      onEscKeyDown={onClose}
      closeIconSvgPath={CloseIcon}
      styles={{ overlay: style }}
    >
      {children}
    </ReactResponsiveModal>
  );
}

function getRoot(func: (appRoot: HTMLElement) => void) {
  const appRoot = document.getElementById("root");
  appRoot && func(appRoot);
}
function removeBlurClass() {
  getRoot(appRoot => appRoot.classList.remove("blurred"));
}
function addBlurClass() {
  getRoot(appRoot => appRoot.classList.add("blurred"));
}

const iconSize = 44;
const CloseIcon = (
  <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24">
    <Path
      d="M12 0.974332L11.025 0L6.00034 5.02532L0.975021 0L0 0.974332L5.02532 5.99966L0 11.025L0.975021 11.9993L6.00034 6.97399L11.025 11.9993L12 11.025L6.97468 5.99966L12 0.974332Z"
      fill={Color.trueWhite as any}
    />
  </Svg>
);
