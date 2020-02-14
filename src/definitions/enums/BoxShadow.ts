export type ElevationLevel = 0 | 1 | 2 | 3 | 8 | 16 | 24;

enum BoxShadow {
  dp0 = "none",
  dp1 = "0px 1px 1px rgba(0, 0, 0, 0.14)",
  dp2 = "0px 1px 2px rgba(0, 0, 0, 0.15)",
  dp3 = "0px 1px 8px rgba(0, 0, 0, 0.12)",
  dp8 = "0px 5px 5px rgba(0, 0, 0, 0.1)",
  dp16 = "0px 8px 10px rgba(0, 0, 0, 0.2)",
  dp24 = "0px 11px 15px rgba(0, 0, 0, 0.2)"
}

export default BoxShadow;
