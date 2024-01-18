import { StyleSheet } from "react-native";
import {
  darkPure,
  green1Color,
  green2Color,
  themeColor,
  whiteColor,
} from "./globalStyles";

export const styles = StyleSheet.create({
  containerCamera: {
    height: "40%",
    backgroundColor: themeColor,
  },
  lineHorz: {
    borderColor: green1Color,
    borderTopWidth: 0.7,
    top: "50%",
  },
  lineVert: {
    flex: 1,
    borderLeftColor: green1Color,
    borderLeftWidth: 0.7,
    left: "50%",
    width: "50%",
  },
  iconNotCam: {
    top: 1,
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  btnsView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    backgroundColor: themeColor,
    alignItems: "center",
  },
  scanbtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColor,
  },
  containerZoom: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a5778",
    padding: 4,
  },
  sliderZoom: {
    height: 30,
    backgroundColor: "#707d7d",
    width: "70%",
  },
  textZoom: {
    width: "30%",
    textAlign: "center",
    color: whiteColor,
    fontWeight: "bold",
  },
  sendToPcOff: {
    backgroundColor: darkPure,
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 2,
    color: whiteColor,
    fontWeight: "bold",
    width: "100%",
    elevation: 5,
    textAlign: "center",
  },
  sendToPcOn: {
    backgroundColor: darkPure,
    paddingVertical: 10,
    borderRadius: 2,
    alignItems: "center",
    gap: 5,
    width: "100%",
    elevation: 5,
  },
  textSending: {
    color: whiteColor,
    textAlign: "center",
    fontWeight: "bold",
  },
  msgCopy: {
    position: "absolute",
    top: 5,
    left: "20%",
    textAlign: "center",
    fontSize: 16,
    color: green2Color,
    fontWeight: "bold",
  },
  codesContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: themeColor,
  },
  scrollContainer: {
    paddingVertical: 4,
    backgroundColor: themeColor,
    gap: 5,
    paddingHorizontal: 6,
  },
});
