import Color from "../../../definitions/enums/Color";

const getStyles = (
  incomingColor?: Color,
  highContrast?: boolean,
  insetShadow?: boolean
) => {
  const defaultColor = "#000";

  const color = incomingColor || defaultColor;

  const inset = insetShadow
    ? { borderWidth: 0.5, borderColor: Color.dividerGrey }
    : {};

  return {
    boxShadow: {
      ...inset,
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: incomingColor || highContrast ? 0.7 : 0.135,
      shadowRadius: 1.2,
      elevation: 5
    },
    disabledBoxShadow: {
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 0.55
      },
      shadowOpacity: incomingColor || highContrast ? 0.9 : 0.535,
      shadowRadius: 1.5,
      elevation: 5
    }
  };
};

interface IProps {
  raised?: boolean;
  disabled?: boolean;
  color?: string;
}
interface IOpts {
  matchColor?: boolean;
  highContrast?: boolean;
  insetShadow?: boolean;
}
export const generateBoxShadow = (
  { raised, disabled, color }: IProps,
  opts: IOpts = {}
) => {
  if (!raised) return {};

  const styles = getStyles(
    opts.matchColor ? (color as any) : undefined,
    opts.highContrast,
    opts.insetShadow
  );

  return disabled ? styles.disabledBoxShadow : styles.boxShadow;
};
