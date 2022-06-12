import { NativeModules } from "react-native";

NativeModules.ReactNativeSocketMobile = jest.fn();

jest.mock("react-native-sound-player", () => jest.fn());

jest.mock("react-native-permissions", () => jest.fn());
