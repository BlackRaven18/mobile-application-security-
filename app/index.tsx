import { Text, View } from "react-native";

export default function Index() {

  const secretApiKey = 'this-is-super-secret-api-key';

  console.log(secretApiKey);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello There General Kenobi!</Text>
    </View>
  );
}
