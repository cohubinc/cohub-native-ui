import { useEffect, useState } from "react";
import SocketMobile, { STATUS_WAITING } from "react-native-socket-mobile";
import {
  IBarcodeScanner,
  BarcodeScannerType,
  ScannerStatus,
  ISocketMobileConfig
} from "./IBarcodeScanner";
import emitter from "src/helpers/eventEmitter";
import { showErrorNotification } from "src/components/Notifications";

export default function useSocketMobile({
  bundleId,
  appKey,
  developerId
}: ISocketMobileConfig) {
  const [status, setStatus] = useState(ScannerStatus.Disconnected);
  const [busy, setBusy] = useState(false);
  const [scanner, setScanner] = useState<IBarcodeScanner | null>(null);

  useEffect(() => {
    initStatus();
    startListening();

    return () => {
      stopListening();
    };
  }, []);

  const initStatus = async () => {
    const socketMobileStatus = await SocketMobile.updateStatusFromDevices();

    if (socketMobileStatus !== STATUS_WAITING) {
      setStatus(ScannerStatus.Connected);
      updateScanner(socketMobileStatus);
    }
  };

  const startListening = async () => {
    setListeners();
    setBusy(true);

    try {
      await SocketMobile.start({
        bundleId,
        developerId,
        appKey
      });
    } catch (e) {
      showErrorNotification({ message: e.message });
    }
  };

  const stopListening = async () => {
    setBusy(true);

    try {
      await SocketMobile.stop();
    } catch (e) {
      showErrorNotification({ message: e.message });
    } finally {
      SocketMobile.clearAllListeners();
      emitter.removeAllListeners("barcodeScanned");
      setBusy(false);
    }
  };

  const updateScanner = (scannerName: string | null) => {
    if (scannerName) {
      const newScanner: IBarcodeScanner = {
        name: scannerName,
        type: BarcodeScannerType.SocketMobile
      };

      setScanner(newScanner);
    } else {
      setScanner(scanner);
    }
  };

  const setListeners = () => {
    SocketMobile.setDeviceStatusListener(async updatedStatus => {
      if (updatedStatus === "connected") {
        setStatus(ScannerStatus.Connected);
        setBusy(false);

        const newScanner = await SocketMobile.updateStatusFromDevices();
        updateScanner(newScanner);
      } else {
        setStatus(ScannerStatus.Disconnected);
        updateScanner(null);
      }
    });

    SocketMobile.setDataListener(({ data }) => {
      emitter.emit("barcodeScanned", data);
    });
  };

  return { busy, status, scanner };
}
