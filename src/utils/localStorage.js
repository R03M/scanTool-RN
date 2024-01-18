import AsyncStorage from '@react-native-async-storage/async-storage';

export const LS_CHANNEL_NAME = '@ChannelName-SCANTOOL';
export const LS_LISTCODES = '@ListCodes-SCANTOOL';

export const lsSetItems = async (item, payload) => {
  await AsyncStorage.setItem(item, JSON.stringify(payload));
};

export const lsGetItems = async (name) => {
  const itemStr = await AsyncStorage.getItem(name);
  const item = JSON.parse(itemStr);
  return item;
};

export const lsRemoveItems = async (item) => {
  await AsyncStorage.removeItem(item);
};
