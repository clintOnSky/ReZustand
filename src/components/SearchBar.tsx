import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { COLORS } from "constants/Colors";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Ionicons name="search" size={20} color={COLORS.medium} />
        <TextInput
          placeholder="Restaurants, groceries, dishes"
          style={styles.input}
        />
      </View>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 20,
    height: 60,
    backgroundColor: "#FFF",
  },
  inputView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 10,
    color: COLORS.mediumDark,
  },
  option: { padding: 10 },
});
