import uuid from "react-native-uuid";
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import useSoundAlerts from "../../hooks/useSound";
import useVersion from "../../hooks/useVersion";
import { BarCodeScanner } from "expo-barcode-scanner";
import { View, Button, Text, ScrollView, Alert, Image } from "react-native";
import {
  cyanColor,
  green1Color,
  red1Color,
  red2Color,
} from "../../styles/globalStyles";
import { styles } from "./homeStyles";
import UpdateModal from "../../components/UpdateModal";

const Home = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [activeCam, setActiveCam] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listCode, setListCode] = useState([]);
  const { correct } = useSoundAlerts();
  const { update, newVersion } = useVersion();

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

  const permission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = async ({ data }) => {
    const exitCode = listCode.find((e) => e === data);
    if (!exitCode) {
      setListCode((prevListCode) => [...prevListCode, data]);
      await correct.replayAsync();
    }
    return;
  };

  useEffect(() => {
    permission();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(listCode.join("\n"));
  };

  return (
    <>
      <UpdateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={newVersion}
      />
      {!update ? null : (
        <Button title="new update" onPress={() => setModalVisible(true)} color={green1Color}/>
      )}
      <View style={styles.container}>
        {activeCam ? (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{ flex: 1, height: "100%" }}
          >
            <View style={styles.lineHorz}></View>
            <View style={styles.lineVert}></View>
          </BarCodeScanner>
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

      {!listCode.length ? null : (
        <Text style={styles.countScan}>Scanned codes {listCode.length}</Text>
      )}

      <View style={styles.btnsView}>
        {!listCode.length ? null : (
          <>
            <Button title="delete" color={red1Color} onPress={handledelete} />
            <Button
              title="copy"
              color={green1Color}
              onPress={copyToClipboard}
            />
          </>
        )}
        {activeCam && (
          <Button
            title="cancel scanner"
            color={red2Color}
            onPress={() => setActiveCam(false)}
          />
        )}
        {!hasPermission && (
          <Button title="give permissions" onPress={() => permission()} />
        )}
        {!activeCam && hasPermission && (
          <Button
            title="start scan"
            color={cyanColor}
            onPress={() => setActiveCam(true)}
          />
        )}
      </View>
    </>
  );
};

export default Home;
