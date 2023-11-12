import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Filter = () => {
  console.log("Open sesame");
  return (
    <View style={styles.container}>
      <Text>Filter</Text>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
