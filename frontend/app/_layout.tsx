import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="index" options={{ headerTitle: 'Login' }} />
      <Stack.Screen name="home" />
    </Stack>
  );
}
