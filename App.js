import { StatusBar } from "react-native";
import Home from "./src/screen/home/Home";
import * as NavigationBar from "expo-navigation-bar";
import { themeColor } from "./src/styles/globalStyles";

export default function App() {
  NavigationBar.setBackgroundColorAsync(themeColor);
  return (
    <>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
      <Home />
    </>
  );
}
