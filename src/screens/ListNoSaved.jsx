import React, { useEffect, useState } from "react";
import { View, VirtualizedList } from "react-native";
import io from "socket.io-client";
import { SOCKETIO_API } from "@env";
import { useDispatch } from "react-redux";
import ItemRow from "../components/ItemRow";
import { setValueListInsp } from "../redux/sistemSlice";
import SmallSendToPc from "../components/SmallSendToPc";
import { LS_CHANNEL_NAME, lsGetItems, lsSetItems } from "../utils/localStorage";

const ListNoSaved = ({ route }) => {
  const dispatch = useDispatch();
  const socket = io(SOCKETIO_API);
  const { data } = route.params;
  const [channelName, setChannelName] = useState("");
  const [edit, setEdit] = useState(false);

  const sendCode = (value, sendList) => {
    sendList
      ? data.map((e) => {
          return socket.emit(channelName, `${e.code}\n`);
        })
      : socket.emit(channelName, `${value}\n`);
  };

  const saveNameChannel = async () => {
    await lsSetItems(LS_CHANNEL_NAME, channelName);
  };

  useEffect(() => {
    const getChannelName = async () => {
      const channelName = await lsGetItems(LS_CHANNEL_NAME);
      setChannelName(channelName);
    };
    getChannelName();
    dispatch(setValueListInsp(data.length));
  }, [data]);

  return (
    <View style={{ flex: 1, margin: 5, gap: 10 }}>
      <SmallSendToPc
        channelName={channelName}
        setChannelName={setChannelName}
        edit={edit}
        setEdit={setEdit}
        sendCode={sendCode}
        onUpdateChannel={saveNameChannel}
      />
      <VirtualizedList
        data={data}
        renderItem={({ item }) => (
          <ItemRow
            id={item.id}
            code={item.code}
            disabledDelete={true}
            onSend={(value) => sendCode(value)}
          />
        )}
        keyExtractor={(item) => item.id}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListNoSaved;
