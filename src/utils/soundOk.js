import { Audio } from "expo-av";

export async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/sound//ok.mp3")
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
