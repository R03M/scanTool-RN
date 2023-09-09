import { useState, useEffect } from "react";
import { Audio } from "expo-av";

const useSoundAlerts = () => {
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    const loadSounds = async () => {
      const correct = new Audio.Sound();

      await correct.loadAsync(require("../../assets/sound/ok.mp3"));

      setSounds({
        correct,
      });
    };
    loadSounds();
    return () => {
      Object.values(sounds).forEach(async (sound) => {
        try {
          await sound.unloadAsync();
        } catch (error) {
          throw error;
        }
      });
    };
  }, []);

  return sounds;
};

export default useSoundAlerts;
