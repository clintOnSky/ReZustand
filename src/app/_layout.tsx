import CustomHeader from "@comp/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { COLORS } from "constants/Colors";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="(modal)/filter"
          options={{
            headerTitle: "Filter",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: COLORS.lightGrey,
            },
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
