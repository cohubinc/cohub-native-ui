import { useEffect, useState } from "react";
import emitter from "src/helpers/eventEmitter";
import useSocketMobile from "./useSocketMobile";
import { IBarcodeScanner, ScannerStatus } from "./IBarcodeScanner";

interface IResult {
  scanner: IBarcodeScanner | null;
  status: "connected" | "disconnected";
  busy: boolean;
}

type OnBarcodeScannedFn = (code: string) => Promise<void> | void;

export { useSocketMobileConfig } from "./useSocketMobile";

export function useBarcodeScanner(
  onBarcodeScanned?: OnBarcodeScannedFn
): IResult {
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

  const [result, setResult] = useState<IResult>({
    scanner: null,
    status: ScannerStatus.Disconnected,
    busy: false
  });

  // Connect and use SocketMobile Scanner
  const socketMobile = useSocketMobile();
  useEffect(() => {
    setResult(socketMobile);
  }, [
    socketMobile.status,
    socketMobile.scanner && socketMobile.scanner.name,
    socketMobile.status
  ]);

  return result;
}
