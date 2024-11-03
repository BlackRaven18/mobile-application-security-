import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
