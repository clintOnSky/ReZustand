import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "constants/Colors";
import { useMemo } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ItemBoxProp {
  title: string;
  icon: string;
  subtitle?: string;
}

const ItemBox = () => {
  const itemData: ItemBoxProp[] = [
    { title: "Sort", subtitle: "Recommended", icon: "swap-vertical" },
    { title: "Hygiene rating", icon: "fast-food-outline" },
    { title: "Offers", icon: "pricetag-outline" },
    { title: "Dietary", icon: "nutrition-outline" },
  ];

  return (
    <>
      <View style={styles.itemView}>
        {itemData?.map((item, index) => (
          <TouchableOpacity style={styles.itemBtn} key={index.toString()}>
            <Ionicons
              name={
                index === 0
                  ? "swap-vertical"
                  : index === 1
                  ? "fast-food-outline"
                  : index === 2
                  ? "pricetag-outline"
                  : "nutrition-outline"
              }
              size={20}
              color={COLORS.medium}
            />
            <View style={styles.itemTitleView}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.header}>Categories</Text>
    </>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  itemView: {
    marginBottom: 16,
  },
  itemBtn: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    height: 50,
    gap: 10,
    borderColor: COLORS.grey,
    borderBottomWidth: 1,
  },
  itemTitleView: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "400",
  },
  itemSubtitle: {},
  header: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },
});
