import React, { useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView, View, VirtualizedList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ItemRow from "../components/ItemRow";
import { MODE_SCAN } from "../utils/emuns";
import { SOCKETIO_API } from "@env";
import io from "socket.io-client";
import AlertMsg from "../components/AlertMsg";
import ScanCam from "../components/ScanCam";
import uuid from "react-native-uuid";
import EnterBarcode from "../components/EnterBarcode";
import SmallSendToPc from "../components/SmallSendToPc";
import { deleteItem, updateList } from "../redux/action";
import { initialStatusDelItem } from "../redux/sistemSlice";
import { LS_CHANNEL_NAME, lsGetItems, lsSetItems } from "../utils/localStorage";
import useSoundAlerts from "../hooks/useSound";

const ListOfItems = () => {
  const dispatch = useDispatch();
  const socket = io(SOCKETIO_API);
  const playSound = useSoundAlerts();

  const [edit, setEdit] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [activeEdit, setActiveEdit] = useState(false);
  const [activeCam, setActiveCam] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  const { listCodes, statusDelItem, itemView, modeScan } = useSelector(
    (state) => state.sistem
  );

  const sendCode = (value, sendList) => {
    sendList
      ? itemView.listCodes?.map((e) => {
          socket.emit(channelName, `${e.code}\n`);
        })
      : socket.emit(channelName, `${value}\n`);
  };

  const saveNameChannel = async () => {
    await lsSetItems(LS_CHANNEL_NAME, channelName);
  };

  const handleDelete = (id) => {
    const currentItems = itemView.listCodes.filter((e) => e?.id !== id);
    const updatedListItems = {
      id: itemView.id,
      name: itemView.name,
      listCodes: currentItems,
    };
    dispatch(deleteItem({ item: updatedListItems, listCodes: listCodes }));
  };

  const handleEditList = (data) => {
    const currentItems = itemView.listCodes.filter((e) => e.code === data);
    if (!currentItems.length) {
      playSound();
      const newItem = {
        id: itemView.id,
        name: itemView.name,
        listCodes: [
          ...itemView.listCodes,
          {
            id: uuid.v4(),
            code: data,
          },
        ],
      };
      dispatch(updateList({ updatedItem: newItem }));
    }
    setCurrentValue("");
  };

  useEffect(() => {
    const getChannelName = async () => {
      const channelName = await lsGetItems(LS_CHANNEL_NAME);
      setChannelName(channelName);
    };
    getChannelName();

    setTimeout(() => {
      dispatch(initialStatusDelItem());
    }, 400);
  }, [statusDelItem]);

  const renderItem = useMemo(() => {
    return ({ item }) => (
      <ItemRow
        key={item.id}
        code={item.code}
        id={item.id}
        onSend={sendCode}
        deleteItem={handleDelete}
      />
    );
  }, [sendCode, handleDelete]);

  return (
    <>
      {statusDelItem && <AlertMsg msg={"Eliminado"} />}
      {activeEdit && modeScan === MODE_SCAN.CAMERA ? (
        <ScanCam
          onCurrentValue={handleEditList}
          activeCam={activeCam}
          setActiveCam={setActiveCam}
        />
      ) : (
        !edit && (
          <EnterBarcode
            currentValue={currentValue}
            handleInput={handleEditList}
          />
        )
      )}
      <View style={{ flex: 1 }}>
        <SmallSendToPc
          channelName={channelName}
          setChannelName={setChannelName}
          edit={edit}
          modeScan={modeScan}
          setEdit={setEdit}
          sendCode={sendCode}
          onUpdateChannel={saveNameChannel}
          editable={true}
          onEditable={() => {
            if (activeCam) {
              setActiveCam(!activeCam);
            }
            setActiveEdit(!activeEdit);
          }}
          statusViewEditable={activeEdit}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={itemView.listCodes}
            renderItem={renderItem}
            keyExtractor={(listCodes) => listCodes.id}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

export default ListOfItems;
