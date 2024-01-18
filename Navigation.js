import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "react-native";
import useInit from "./src/hooks/useInit";
import { useSelector } from "react-redux";
import handlerLanguage from "./src/utils/languaje";
import * as NavigationBar from "expo-navigation-bar";
import { themeColor, whiteColor } from "./src/styles/globalStyles";

import Home from "./src/screens/Home";
import ListNoSaved from "./src/screens/ListNoSaved";
import ListOfItems from "./src/screens/ListOfItems";
import CollectionList from "./src/screens/CollectionList";

const Stack = createNativeStackNavigator();

function MyStack() {
  const { listCodes, valueListInsp, itemView } = useSelector(
    (state) => state.sistem
  );
  const titleCollection = `${handlerLanguage("collection")} ${
    listCodes?.length ? listCodes.length : 0
  }`;

  const titleDetailsList = `${valueListInsp} ${handlerLanguage(
    "detailsCurrentL"
  )} `;
  const titleListCurrent = itemView.name;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: themeColor },
        headerTintColor: whiteColor,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CollectionList"
        component={CollectionList}
        options={{
          headerShown: true,
          title: titleCollection,
        }}
      />
      <Stack.Screen
        name="ListOfItems"
        component={ListOfItems}
        options={{
          headerShown: true,
          title: titleListCurrent,
        }}
      />
      <Stack.Screen
        name="ListNoSaved"
        component={ListNoSaved}
        options={{
          headerShown: true,
          title: titleDetailsList,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  NavigationBar.setBackgroundColorAsync(themeColor);
  useInit();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
      <MyStack />
    </NavigationContainer>
  );
}
