import { StyleSheet } from "react-native";
import Font from "./../enums/Font";

const gs = StyleSheet.create({
  titleText: {
    fontSize: 36.8,
    lineHeight: 43,
    textAlign: "left",
    fontFamily: Font.defaultFontFamily
  },
  subtitleText: {
    fontSize: 27.2,
    lineHeight: 32,
    textAlign: "left",
    fontFamily: Font.defaultFontFamily
  },
  largeHeadingText: {
    fontFamily: Font.defaultFontFamily,
    fontSize: 22.4,
    lineHeight: 26,
    textAlign: "left"
  },
  tinyHeadingText: {
    fontFamily: Font.defaultFontFamily,
    fontSize: 18,
    lineHeight: 22,
    textAlign: "left"
  },
  smallHeadingText: {
    fontFamily: Font.defaultFontFamily,
    fontSize: 19.2,
    lineHeight: 23,
    textAlign: "left"
  },
  largeBodyText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: Font.defaultFontFamily,
    textAlign: "left"
  },
  regularBodyText: {
    fontFamily: Font.defaultFontFamily,
    fontSize: 14,
    lineHeight: 16,
    textAlign: "left"
  },
  smallBodyText: {
    fontFamily: Font.defaultFontFamily,
    fontSize: 12,
    lineHeight: 14,
    textAlign: "left"
  },
  tinyBodyText: {
    fontFamily: Font.defaultFontFamily,
    fontSize: 10.2,
    lineHeight: 12,
    textAlign: "left"
  },
  boldRegularBodyText: {
    fontFamily: Font.defaultFontFamily,
    fontSize: 14,
    lineHeight: 16,
    textAlign: "left"
  },
  monoRegularBodyText: {
    fontFamily: Font.monoFontFamily,
    fontSize: 14,
    lineHeight: 16,
    textAlign: "left"
  },
  monoSmallBodyText: {
    fontFamily: Font.monoFontFamily,
    fontSize: 12,
    lineHeight: 14,
    textAlign: "left"
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  // mutedText: { color: Colors.darkGrey },
  debug: { borderWidth: 1, borderColor: "#7CFC00" }
});

export default gs;
