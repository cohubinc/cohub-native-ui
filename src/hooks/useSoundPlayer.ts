import { useEffect } from "react";
import SoundPlayer from "react-native-sound-player";

export function useSoundPlayer(
  onFinishPlaying = () => null,
  onFinishLoading = () => null,
  onFinishLoadingFile = () => null,
  onFinishLoadingUrl = () => null
) {
  useEffect(() => {
    const onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      "FinishedPlaying",
      onFinishPlaying
    );
    const onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      "FinishedLoading",
      onFinishLoading
    );
    const onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      "FinishedLoadingFile",
      onFinishLoadingFile
    );
    const onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      "FinishedLoadingURL",
      onFinishLoadingUrl
    );

    return () => {
      onFinishedPlayingSubscription.remove();
      onFinishedLoadingSubscription.remove();
      onFinishedLoadingURLSubscription.remove();
      onFinishedLoadingFileSubscription.remove();
    };
  }, []);
}
