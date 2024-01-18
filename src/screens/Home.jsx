import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import io from "socket.io-client";
import { SOCKETIO_API } from "@env";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import { MODE_SCAN } from "../utils/emuns";
import ScanCam from "../components/ScanCam";
import useVersion from "../hooks/useVersion";
import Settings from "../components/Settings";
import SendToPc from "../components/SendToPc";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/homeStyles";
import useSoundAlerts from "../hooks/useSound";
import BtnCuston from "../components/BtnCuston";
import handlerLanguage from "../utils/languaje";
import TableCodes from "../components/TableCodes";
import UpdateModal from "../components/UpdateModal";
import EnterBarcode from "../components/EnterBarcode";
import { useNavigation } from "@react-navigation/native";
import { LS_CHANNEL_NAME, lsGetItems } from "../utils/localStorage";
import { blueColor, green1Color, themeColor } from "../styles/globalStyles";

const Home = () => {
  const socket = io(SOCKETIO_API);
  const navigation = useNavigation();
  const playSound = useSoundAlerts();
  const { update, newVersion } = useVersion();

  const [edit, setEdit] = useState(false);
  const [listCode, setListCode] = useState([]);
  const [copyMsg, setCopyMsg] = useState(false);
  const [sendCodes, setSendCodes] = useState(false);
  const [activeCam, setActiveCam] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [sendToPcVisible, setSendToPcVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  const { modeScan } = useSelector((state) => state.sistem);

  const handleBarCodeScanned = async (data) => {
    const exitCode = listCode.find((e) => e.code === data);
    if (!exitCode) {
      playSound();
      setListCode((prevListCode) => [
        ...prevListCode,
        { id: uuid.v4(), code: data },
      ]);
      if (sendCodes) {
        socket.emit(channelName, `${data}\n`);
      }
    }
    setCurrentValue("");
  };

  const handleDeleteOneCode = (id) => {
    const curretList = listCode.filter((item) => item.id !== id);
    setListCode(curretList);
  };

  useEffect(() => {
    const getChannelName = async () => {
      const channelName = await lsGetItems(LS_CHANNEL_NAME);
      setChannelName(channelName);
    };
    getChannelName();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: themeColor }}>
      {!update ? null : (
        <BtnCuston
          title={handlerLanguage("newUpdate")}
          onPress={() => setModalVisible(true)}
          backGColor={green1Color}
          styles={{ borderRadius: 0 }}
        />
      )}
      {modeScan === MODE_SCAN.CAMERA ? (
        <ScanCam
          onCurrentValue={handleBarCodeScanned}
          activeCam={activeCam}
          setActiveCam={setActiveCam}
        />
      ) : (
        !edit && (
          <EnterBarcode
            currentValue={currentValue}
            handleInput={handleBarCodeScanned}
          />
        )
      )}
      <UpdateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={newVersion}
      />
      <SendToPc
        sendToPcVisible={sendToPcVisible}
        setSendToPcVisible={setSendToPcVisible}
        channelName={channelName}
        setChannelName={setChannelName}
        sendCodes={sendCodes}
        setSendCodes={setSendCodes}
      />
      <Settings
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        listCode={listCode}
        setListCode={setListCode}
        setCopyMsg={setCopyMsg}
        sendCodes={sendCodes}
        sendToPcVisible={sendToPcVisible}
        setSendToPcVisible={setSendToPcVisible}
        activeCam={activeCam}
        setActiveCam={setActiveCam}
      />

      <BtnCuston
        title={<Ionicons name="options" size={30} />}
        onPress={() => setShowSettings(!showSettings)}
        styles={{ position: "absolute", bottom: 5, zIndex: 1, right: 5 }}
        backGColor={blueColor}
      />

      <TableCodes
        edit={edit}
        setEdit={setEdit}
        deleteItem={handleDeleteOneCode}
        listCode={listCode}
        setListCode={setListCode}
        goToDetails={() => {
          setActiveCam(false);
          navigation.navigate("ListNoSaved", { data: listCode });
        }}
      />

      {copyMsg && (
        <Text style={styles.msgCopy}>{handlerLanguage("clipboardMsg")}</Text>
      )}
    </View>
  );
};

export default Home;
