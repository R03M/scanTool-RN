import React, { useState, useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { green2Color } from "../styles/globalStyles";

const Dots = ({ mode }) => {
  const [dot1] = useState(new Animated.Value(mode));
  const animationRef = useRef();

  useEffect(() => {
    animateDots();
    return () => {
      animationRef.current && animationRef.current.stop();
    };
  }, []);

  const animateDots = () => {
    const duration = 100;
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: duration,
          easing: Easing.circle,
          useNativeDriver: true,
        }),
        Animated.timing(dot1, {
          toValue: 0,
          duration: duration,
          easing: Easing.circle,
          useNativeDriver: true,
        }),
      ])
    );
    animationRef.current.start();
  };

  const dot1Style = {
    opacity: dot1,
    backgroundColor: green2Color,
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    transform: [{ scale: dot1 }],
  };

  return (
    <View>
      <Animated.View style={dot1Style} />
    </View>
  );
};

export default Dots;
