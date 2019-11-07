declare var __DEV__: boolean;

type IFixMe = any;
type IToDo = any;
type IInexpressible = any;
type INotWorthIt = any;
type IFuckIt = any;
type IAnyFields = { [field: string]: any };
type IWithAnyFields<T> = T & IAnyFields;

declare module "@cohubinc/react-select";
declare module "react-responsive";
declare module "react-native-sound-player" {
  interface ISoundPlayer {
    playSoundFile: (name: string, type: string) => void;
    loadSoundFile: (name: string, type: string) => void;
    playUrl: (url: string) => void;
    loadUrl: (url: string) => void;
    onFinishedPlaying: (callback: (success: boolean) => any) => void;
    onFinishedLoading: (callback: (success: boolean) => any) => void;
    addEventListener: (
      eventName:
        | "FinishedLoading"
        | "FinishedPlaying"
        | "FinishedLoadingURL"
        | "FinishedLoadingFile",
      callback: Function
    ) => { remove: Function };
    play: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    seek: (seconds: number) => void;
    setVolume: (volume: number) => void;
    setSpeaker: (on: boolean) => void;
    getInfo: () => Promise<any>;
    unmount: () => void;
  }

  const SoundPlayer: ISoundPlayer = {};

  export default SoundPlayer;
}
declare module "react-native-socket-mobile" {
  interface ISocketMobile {
    start({
      bundleId: string,
      developerId: string,
      appKey: string
    }): Promise<boolean | Error>;
    stop(): Promise<boolean | Error>;
    updateStatusFromDevices(): Promise<string>;
    setDataListener(callback: (result: { data: string }) => void): void;
    setDeviceStatusListener(
      callback: (status: "connected" | "disconnected") => void
    ): void;
    clearAllListeners(): void;
  }

  const SocketMobile: ISocketMobile = {};

  export const STATUS_WAITING: string;

  export default SocketMobile;
}
