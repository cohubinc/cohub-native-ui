import { NativeModules } from "react-native";

NativeModules.ReactNativeSocketMobile = jest.fn();

jest.mock("react-native-socket-mobile", () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn(),
  updateStatusFromDevices: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  clearAllListeners: jest.fn()
}));

jest.mock("react-native-sound-player", () => jest.fn());

jest.mock("react-native-permissions", () => jest.fn());
