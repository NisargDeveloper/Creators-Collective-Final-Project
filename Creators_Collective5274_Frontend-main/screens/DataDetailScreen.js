import React from "react";
import { View, Text } from "react-native";

const DataDetailScreen = ({ route }) => {
  const { description } = route.params;

  console.log("Received description:", description);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{description}</Text>
    </View>
  );
};

export default DataDetailScreen;
