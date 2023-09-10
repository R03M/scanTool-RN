import uuid from "react-native-uuid";
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import useSoundAlerts from "../../hooks/useSound";
import useVersion from "../../hooks/useVersion";
import { View, Button, Text, ScrollView, Alert, Image } from "react-native";
import {
  cyanColor,
  green1Color,
  red1Color,
  red2Color,
} from "../../styles/globalStyles";
import { styles } from "./homeStyles";
import UpdateModal from "../../components/UpdateModal";
import { Camera, FlashMode, CameraType } from "expo-camera";

const Home = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [activeCam, setActiveCam] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listCode, setListCode] = useState([]);
  const { correct } = useSoundAlerts();
  const { update, newVersion, error } = useVersion();
  const [torchOn, setTorchOn] = useState(false);
  const [zoom, setZoom] = useState(0);

  const handledelete = () => {
    Alert.alert("Wait", `${listCode.length} codes will be removed`, [
      {
        text: "cancel",
        style: "cancel",
      },
      {
        text: "delete",
        onPress: () => {
          setListCode([]);
        },
        style: "destructive",
      },
    ]);
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (listCode.length <= 0) {
      setListCode([data]);
      await correct.replayAsync();
      return;
    }
    const exitCode = listCode.find((e) => e === data);
    if (!exitCode) {
      setListCode((prevListCode) => [...prevListCode, data]);
      await correct.replayAsync();
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(listCode.join("\n"));
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <UpdateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={newVersion}
      />
      {!update ? null : (
        <Button
          title="new update"
          onPress={() => setModalVisible(true)}
          color={green1Color}
        />
      )}
      <View style={styles.container}>
        {activeCam ? (
          <Camera
            style={{ flex: 1 }}
            type={CameraType.back}
            onBarCodeScanned={handleBarCodeScanned}
            flashMode={torchOn ? FlashMode.torch : FlashMode.off}
            zoom={zoom}
          >
            <View style={styles.lineHorz}></View>
            <View style={styles.lineVert}></View>
          </Camera>
        ) : (
          <Image
            style={styles.iconNotCam}
            source={require("../../../assets/camDisabled.png")}
          />
        )}
      </View>
      <View style={styles.scrollV}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          {listCode.map((e) => {
            return (
              <Text key={uuid.v4()} style={styles.textSty}>
                {e}
              </Text>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.btnsView}>
        {!listCode.length ? null : (
          <>
            <Button title="delete" color={red1Color} onPress={handledelete} />
            <Text style={styles.countScan}>
              SCANNED CODES {listCode.length}
            </Text>
            <Button
              title="copy"
              color={green1Color}
              onPress={copyToClipboard}
            />
          </>
        )}
        {!permission?.granted ? (
          <Button title="give permissions" onPress={requestPermission} />
        ) : null}
      </View>
      {activeCam && (
        <View style={styles.btnsView}>
          <Button
            title="cancel scanner"
            color={red2Color}
            onPress={() => setActiveCam(false)}
          />
          <Button
            title={!torchOn ? "torch on" : "off torch"}
            color={'#ffca28'}
            onPress={() => setTorchOn(!torchOn)}
          />
          <Button
            title={zoom === 0 ? "zoom in" : "zoom off"}
            color={'#5998c0'}
            onPress={() => {
              zoom === 1 ? setZoom(0) : setZoom(1);
            }}
          />
        </View>
      )}
      {permission && !activeCam && (
        <View style={styles.scanbtn}>
          <Button
            title="start scan"
            color={cyanColor}
            onPress={() => setActiveCam(true)}
          />
        </View>
      )}
    </>
  );
};

export default Home;
