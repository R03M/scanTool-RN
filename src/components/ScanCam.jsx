import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Camera, FlashMode, CameraType } from "expo-camera";
import {
  green1,
  themeColor,
  whiteColor,
  skyeColor,
  greenSlime,
  cyanColor,
  red2Color,
  yellow,
} from "../styles/globalStyles";
import Slider from "@react-native-community/slider";
import BtnCuston from "./BtnCuston";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import handlerLanguage from "../utils/languaje";

const ScanCam = ({ onCurrentValue, activeCam, setActiveCam }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [zoom, setZoom] = useState(0);
  const [torchOn, setTorchOn] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const iconSize = 25;

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    onCurrentValue(data);
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.containerCamera,
            !activeCam && { justifyContent: "center", alignItems: "center" },
          ]}
        >
          {currentValue && (
            <Text style={styles.valueCurrent}>{currentValue}</Text>
          )}
          {activeCam ? (
            <Camera
              style={{ flex: 1 }}
              type={CameraType.back}
              onBarCodeScanned={handleBarCodeScanned}
              flashMode={torchOn ? FlashMode.torch : FlashMode.off}
              zoom={zoom}
              ratio="1:1"
            >
              <View style={styles.lineHorz}></View>
              <View style={styles.lineVert}></View>
            </Camera>
          ) : (
            <Image
              style={styles.iconNotCam}
              source={require("../../assets/camDisabled.png")}
            />
          )}
          <View style={styles.containerBtns}>
            {!permission?.granted ? (
              <BtnCuston
                title={handlerLanguage("givePermis")}
                backGColor={skyeColor}
                onPress={requestPermission}
              />
            ) : (
              <>
                {activeCam && (
                  <BtnCuston
                    title={
                      !torchOn ? (
                        <MaterialCommunityIcons name="led-on" size={iconSize} />
                      ) : (
                        <MaterialCommunityIcons
                          name="led-off"
                          size={iconSize}
                        />
                      )
                    }
                    backGColor={yellow}
                    onPress={() => setTorchOn(!torchOn)}
                  />
                )}
                <BtnCuston
                  title={
                    !activeCam ? (
                      <AntDesign name="camera" size={iconSize} />
                    ) : (
                      <MaterialCommunityIcons
                        name="camera-off"
                        size={iconSize}
                      />
                    )
                  }
                  backGColor={!activeCam ? cyanColor : red2Color}
                  onPress={() => {
                    if (activeCam) {
                      setActiveCam(!activeCam);
                      setCurrentValue("");
                      return;
                    }
                    setActiveCam(!activeCam);
                  }}
                />
              </>
            )}
          </View>
        </View>
      </View>
      {activeCam && (
        <View style={styles.containerZoom}>
          <Slider
            value={zoom}
            onValueChange={setZoom}
            style={styles.sliderZoom}
            minimumValue={0}
            step={0.1}
            maximumValue={1}
            thumbTintColor={whiteColor}
          />
          <Text style={styles.textZoom}>Zoom {zoom.toFixed(1) * 10}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor,
    flexDirection: "row",
    padding: 2,
  },
  containerCamera: {
    flex: 1,
    marginTop: 2,
    marginLeft: 4,
  },
  containerBtns: {
    position: "absolute",
    right: 0,
    bottom: 0,
    justifyContent: "center",
    gap: 5,
    padding: 5,
  },
  valueCurrent: {
    color: greenSlime,
    textAlign: "center",
    fontSize: 16,
    position: "relative",
  },
  iconNotCam: {
    resizeMode: "center",
    width: "100%",
  },
  lineHorz: {
    borderColor: green1,
    borderTopWidth: 0.7,
    top: "50%",
  },
  lineVert: {
    flex: 1,
    borderLeftColor: green1,
    borderLeftWidth: 0.7,
    left: "50%",
    width: "50%",
  },
  containerZoom: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cyanColor,
    margin: 5,
    padding: 2,
    gap: 4,
    borderRadius: 4,
  },
  sliderZoom: {
    height: 20,
    width: "75%",
  },
  textZoom: {
    width: "25%",
    textAlign: "center",
    color: whiteColor,
    fontWeight: "bold",
  },
});

export default ScanCam;
