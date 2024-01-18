import { useEffect, useRef } from "react";
import { AppState } from "react-native";

const useFocus = (action) => {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      appState.current = nextAppState;
      if (appState.current === "active") {
        action();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useFocus;
