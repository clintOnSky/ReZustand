import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/Colors";
import categories from "assets/data/filter.json";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ItemBox from "@comp/ItemBox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";

interface Categories {
  name: string;
  count: number;
  checked?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Filter = () => {
  const [items, setItems] = useState<Categories[]>(categories);

  const [selectedItems, setSelectedItems] = useState<Categories[]>([]);

  const flexWidth = useSharedValue(0);

  const scale = useSharedValue(0);

  const marginRight = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      marginRight: marginRight.value,
    };
  });

  const animatedOpacity = useAnimatedStyle(() => {
    return {
      // IMPORTANT NOTICE:
      // Always add opacity animation in its separate animatedStyle or it will lead to bugs
      // If you are adding more than one animated style to a component, make sure you add the opacity style first
      // Adding opacity prop before the other props in the same animated style does not work

      opacity: scale.value ? 1 : 0,
    };
  });

  const animatedScale = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  useEffect(() => {
    const wasSelected = selectedItems.length > 0; // Add this line

    const anyCheckboxChecked = items.some((item) => item.checked);

    if (!anyCheckboxChecked) {
      flexWidth.value = withTiming(0, { duration: 50 });
      scale.value = withTiming(0, { duration: 50 });
      marginRight.value = withTiming(0, { duration: 50 });
    } else if (!wasSelected) {
      // Only set values when the first checkbox is checked
      flexWidth.value = withTiming(150, { duration: 100 });
      scale.value = withTiming(1, { duration: 100 });
      marginRight.value = withTiming(12, { duration: 100 });
    }

    setSelectedItems(items.filter((item) => item.checked));
  }, [items]);

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
      <FlatList
        data={items}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListHeaderComponent={() => <ItemBox />}
      />
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          {/* <View style={{ backgroundColor: "red" }}> */}
          <AnimatedTouchable
            style={[styles.outlineBtn, animatedOpacity, animatedStyles]}
            onPress={handleClearAll}
          >
            <Animated.Text
              style={[styles.outlineText, animatedScale]}
              numberOfLines={1}
            >
              Clear all
            </Animated.Text>
          </AnimatedTouchable>
          {/* </View> */}
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.footerText} numberOfLines={1}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    // gap: 12,
    paddingHorizontal: 16,
  },
  outlineBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.light,
    marginTop: 10,
    height: 56,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    borderRadius: 8,
  },
  outlineText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },
  applyBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginTop: 10,
    height: 56,
    borderRadius: 8,
  },
  footerText: {
    color: COLORS.light,
    fontWeight: "700",
    fontSize: 16,
  },
});
