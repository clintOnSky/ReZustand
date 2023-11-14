import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
  Button,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "constants/Colors";
import categories from "assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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

const Filter = () => {
  const [items, setItems] = useState<Categories[]>(categories);

  const toggleCheck = (name: string) => {
    setItems((prevItems) =>
      prevItems?.map((item) =>
        item.name === name ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClearAll = () => {
    setItems((prevItems) =>
      prevItems?.map((item) => {
        item.checked = false;
        return item;
      })
    );
  };

  const renderItem: ListRenderItem<Categories> = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        fillColor={COLORS.primary}
        unfillColor={COLORS.light}
        disableBuiltInState
        iconStyle={{
          borderRadius: 2,
          borderColor: COLORS.primary,
          borderWidth: 2,
        }}
        innerIconStyle={{
          borderRadius: 2,
        }}
        isChecked={item.checked}
        onPress={() => {
          toggleCheck(item.name);
        }}
        disableText
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <Button title="Clear All" onPress={handleClearAll} />
      <FlatList
        data={items}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListHeaderComponent={() => <ItemBox />}
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
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.light,
  },
  listItemText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.mediumDark,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
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
