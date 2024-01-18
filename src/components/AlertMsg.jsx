import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AlertMsg = ({ msg, stylesContainer, stylesText }) => {
  return (
    <View style={[styles.default, stylesContainer]}>
      <Text style={[styles.defaultText, stylesText]}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    position: "absolute",
    top: "50%",
    backgroundColor: "red",
    zIndex: 1,
    paddingVertical: 5,
    width: "100%",
    borderRadius: 20,
    elevation: 10,
  },
  defaultText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AlertMsg;
