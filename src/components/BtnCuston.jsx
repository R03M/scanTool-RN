import React from "react";
import { Text, Pressable, View } from "react-native";

const BtnCuston = ({
  title,
  onPress,
  backGColor,
  styles,
  stylesText,
  stylesViewBtns,
  value1,
  value2,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "white" : backGColor,
          borderColor: pressed ? backGColor : "black",
          borderWidth: 0.8,
          paddingVertical: 10,
          borderRadius: 4,
          elevation: 4,
          padding: 5,
        },
        styles,
      ]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            },
            stylesViewBtns,
          ]}
        >
          {value1 && (
            <Text
              style={[
                {
                  textAlign: "center",
                  textAlignVertical: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: pressed ? backGColor : "white",
                },
                stylesText,
              ]}
            >
              {value1}
            </Text>
          )}
          <Text
            style={[
              {
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 14,
                color: pressed ? backGColor : "white",
              },
              stylesText,
            ]}
          >
            {title}
          </Text>
          {value2 && (
            <Text
              style={[
                {
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: pressed ? backGColor : "white",
                },
                stylesText,
              ]}
            >
              {value2}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default BtnCuston;
