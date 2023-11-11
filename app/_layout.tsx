import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  // console.log(
  //   "🚀 ~ file: _layout.tsx:14 ~ RootLayout ~ colorScheme:",
  //   colorScheme
  // );

  return (
    <Stack>
      <Stack.Screen name="index" options={{}} />
    </Stack>
  );
}
