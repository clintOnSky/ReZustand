import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
} from "react-native";
import React from "react";
import { COLORS } from "constants/Colors";
import categories from "assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";

interface Categories {
  name: string;
  count: number;
  checked?: boolean;
}

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
      <View style={styles.itemContainer}>
        {itemData?.map((item, index) => (
          <TouchableOpacity style={styles.itemBtn} key={index.toString()}>
            <Ionicons name={item.icon} size={20} color={COLORS.medium} />
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

const Filter = () => {
  const renderItem: ListRenderItem<Categories> = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
        ListHeaderComponent={() => <ItemBox />}
        // showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.footerText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
  },
  itemBtn: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    gap: 10,
    borderColor: COLORS.grey,
    borderBottomWidth: 1,
  },
  iconView: {
    flexDirection: "row",
    gap: -9,
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
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
  },
  list: {
    padding: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.light,
    height: 100,
    elevation: 30,
  },
  applyBtn: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    marginTop: 10,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  footerText: {
    color: COLORS.light,
    fontWeight: "700",
    fontSize: 16,
  },
});
