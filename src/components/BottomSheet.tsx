import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { COLORS } from "constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BottomSheet = forwardRef<BottomSheetModal>((prop, ref) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const snapPoints = useMemo(() => ["50%"], []);
  const data = ["Delivery", "Pickup"];

  const { dismiss } = useBottomSheetModal();

  const renderBackDrop = useCallback(
    (prop: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...prop}
      />
    ),
    []
  );
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackDrop}
      backgroundStyle={{ backgroundColor: COLORS.lightGrey, borderRadius: 0 }}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={styles.bottomContent}>
        <View style={styles.toggleView}>
          {data?.map((title, index) => (
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                activeIndex === index ? styles.activeBtn : styles.inactiveBtn,
              ]}
              key={index.toString()}
              onPress={() => setActiveIndex(index)}
            >
              <Text
                style={
                  activeIndex === index
                    ? styles.activeText
                    : styles.inactiveText
                }
              >
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.subtitle}>Your Location</Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.itemBtn}>
            <Ionicons name="location-outline" size={20} color={COLORS.medium} />
            <Text style={styles.itemText}>Current Location</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </Link>
        <Text style={styles.subtitle}>Arrival time</Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.itemBtn}>
            <Ionicons
              name="stopwatch-outline"
              size={20}
              color={COLORS.medium}
            />
            <Text style={styles.itemText}>Now</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.confirmBtn} onPress={() => dismiss()}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  bottomContent: {
    flex: 1,
  },
  toggleView: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
    marginBottom: 32,
  },
  toggleBtn: {
    paddingHorizontal: 30,
    paddingVertical: 3,
    borderRadius: 32,
  },
  activeBtn: {
    backgroundColor: COLORS.primary,
  },
  inactiveBtn: {
    backgroundColor: "transparent",
  },
  activeText: {
    color: "#FFF",
    fontWeight: "700",
  },
  inactiveText: {
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  itemBtn: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    gap: 8,
    borderColor: COLORS.grey,
    borderWidth: 1,
  },
  itemText: {
    flex: 1,
    fontWeight: "700",
  },
  confirmBtn: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    margin: 16,
    borderRadius: 4,
  },
  confirmText: {
    color: "#FFF",
    fontWeight: "700",
  },
});
