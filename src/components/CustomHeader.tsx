import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import SearchBar from "@comp/SearchBar";

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.headerLeft}>
          <Image
            source={require("@img/bike.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Delivery • Now</Text>
          <TouchableOpacity style={styles.locationView}>
            <Text style={styles.location}>Edo, Benin City</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.headerRight}>
          <Ionicons name="person-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFF" },
  container: {
    flexDirection: "row",
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    gap: 20,
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: { flex: 1 },
  title: {
    fontSize: 14,
    color: COLORS.medium,
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  location: {
    fontSize: 18,
    fontWeight: "800",
  },
  headerRight: {
    backgroundColor: COLORS.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default CustomHeader;
