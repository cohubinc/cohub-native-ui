import { useEffect, useState } from 'react';
import SocketMobile, { STATUS_WAITING } from 'react-native-socket-mobile';
import { showErrorNotification } from 'src/components/Notifications';
import emitter from 'src/helpers/eventEmitter';

import {
  BarcodeScannerType, IBarcodeScanner, ISocketMobileConfig, ScannerStatus
} from './IBarcodeScanner';

let listeners = 0;

let _socketMobileConfig: ISocketMobileConfig | undefined;

export function useSocketMobileConfig(socketMobileConfig: ISocketMobileConfig) {
  if (!_socketMobileConfig) {
    _socketMobileConfig = socketMobileConfig;
  }
}

export default function useSocketMobile() {
  const [status, setStatus] = useState(ScannerStatus.Disconnected);
  const [busy, setBusy] = useState(false);
  const [scanner, setScanner] = useState<IBarcodeScanner | null>(null);

  if (!_socketMobileConfig) {
    throw new Error(
      "Socket Mobile Config must be initialized. Use 'useSocketMobileConfig' before calling this hook"
    );
  }

  useEffect(() => {
    initStatus();
    startListening();

    return () => {
      stopListening();
    };
  }, []);

  const initStatus = async () => {
    const newStatus = await SocketMobile.updateStatusFromDevices();
    if (newStatus !== STATUS_WAITING) {
      setStatus(ScannerStatus.Connected);
      setScanner({
        name: newStatus,
        type: BarcodeScannerType.SocketMobile
      });
    }
  };

  const startListening = async () => {
    listeners = listeners + 1;

    setListeners();
    setBusy(true);

    try {
      await SocketMobile.start(_socketMobileConfig!);
    } catch (e) {
      showErrorNotification({
        title: "Socket Mobile Scanner",
        message: e.message
      });
    }
  };

  const stopListening = async () => {
    listeners = listeners - 1;

    if (listeners === 0) {
      try {
        await SocketMobile.stop();
      } catch (e) {
        showErrorNotification({ message: e.message });
      } finally {
        SocketMobile.clearAllListeners();
        setBusy(false);
      }
    }
  };

  const setListeners = () => {
    SocketMobile.setDeviceStatusListener(async (newStatus: string) => {
      if (newStatus === "connected") {
        setStatus(ScannerStatus.Connected);
        setBusy(false);

        const name = await SocketMobile.updateStatusFromDevices();
        setScanner({
          name,
          type: BarcodeScannerType.SocketMobile
        });
      } else {
        setStatus(ScannerStatus.Disconnected);
        setScanner(null);
        setBusy(false);
      }
    });

    if (listeners === 1) {
      SocketMobile.setDataListener(({ data }: { data: string }) => {
        emitter.emit("barcodeScanned", data);
      });
    }
  };

  return { busy, status, scanner };
}
