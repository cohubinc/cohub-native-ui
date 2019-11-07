export enum BarcodeScannerType {
  SocketMobile = "socketmobile"
}

export interface IBarcodeScanner {
  type: BarcodeScannerType;
  name: string;
}

export enum ScannerStatus {
  Connected = "connected",
  Disconnected = "disconnected"
}

export interface ISocketMobileConfig {
  bundleId: string;
  appKey: string;
  developerId: string;
}
