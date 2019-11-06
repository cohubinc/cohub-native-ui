import { useEffect, useState } from "react";
import emitter from "src/helpers/eventEmitter";
import useSocketMobile from "./useSocketMobile";
import {
  IBarcodeScanner,
  ScannerStatus,
  ISocketMobileConfig
} from "./IBarcodeScanner";

interface IResult {
  scanner: IBarcodeScanner | null;
  status: "connected" | "disconnected";
  busy: boolean;
}

let _result: IResult = {
  scanner: null,
  status: ScannerStatus.Disconnected,
  busy: false
};

type OnBarcodeScannedFn = (code: string) => void;

let _socketMobileConfig: ISocketMobileConfig | undefined;

export function useSocketMobileConfig(socketMobileConfig: ISocketMobileConfig) {
  if (!_socketMobileConfig) {
    _socketMobileConfig = socketMobileConfig;
  }
}

export default function useBarcodeScanner(
  onBarcodeScanned?: OnBarcodeScannedFn
): IResult {
  if (!_socketMobileConfig) {
    throw new Error(
      "Socket Mobile Config must be initialized. Use 'useSocketMobileConfig' before calling this hook"
    );
  }

  useEffect(() => {
    if (onBarcodeScanned) {
      emitter.on("barcodeScanned", onBarcodeScanned);
    }

    return () => {
      if (onBarcodeScanned) {
        emitter.removeListener("barcodeScanned", onBarcodeScanned);
      }
    };
  }, [onBarcodeScanned]);

  const [result, setResult] = useState(_result);

  useEffect(() => {
    setResult(_result);
  }, [_result.status, _result.scanner && _result.scanner.name, _result.busy]);

  // Connect and use SocketMobile Scanner
  const socketMobile = useSocketMobile(_socketMobileConfig);
  useEffect(() => {
    _result = socketMobile;
  }, [
    socketMobile.status,
    socketMobile.scanner && socketMobile.scanner.name,
    socketMobile.status
  ]);

  return result;
}
