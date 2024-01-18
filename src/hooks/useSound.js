import { useState, useEffect } from "react";
import { Audio } from "expo-av";

const useSoundAlerts = () => {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sound/ok.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return playSound;
};

export default useSoundAlerts;
