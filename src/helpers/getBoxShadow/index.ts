import { ElevationLevel } from "src/definitions/enums/BoxShadow";
import { ViewStyle } from "react-native";

type ShadowStyles = Required<
  Pick<
    ViewStyle,
    | "shadowColor"
    | "shadowOffset"
    | "shadowOpacity"
    | "shadowRadius"
    | "elevation"
  >
>;

export default function getBoxShadow(elevation: ElevationLevel) {
  if (elevation === 0) return null;

  return shadowMap[elevation];
}

type TShadowMap = { [elevation in ElevationLevel]: ShadowStyles };
const shadowMap: Omit<TShadowMap, 0> = {
  1: {
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1
  },
  2: {
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },
  3: {
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3
  },
  8: {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8
  },
  16: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 16
  },
  24: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { height: 11, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 24
  }
};
