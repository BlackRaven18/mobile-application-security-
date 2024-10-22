import { Button, IconButton, Stack, Text, TextInput } from "@react-native-material/core";
import React, { useState } from "react";
import { StyleSheet, View} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";

export default function Index() {

  const backendUrl = "http://192.168.4.164:3000";
  // const backendUrl = "http://localhost:3000";

  const [message, setMessage] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const sendLogin = (login: string, password: string) => {
    console.log("Sended login request");
    axios.post(backendUrl + "/login", { login: login, password: password }).then((response) => {
      console.log(response.data);
      setMessage(response.data + ": " + login);
    })
    .catch((error) => {
      console.log(error);
      setMessage(error);
    })
  }

  return (
    <Stack spacing={2} style={{ margin: 16}}>
      <TextInput
        label="Login"
        leading={props => <Icon name="account" {...props} />}
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        label="Password"
        variant="outlined"
        trailing={props => (
          <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
        )}
        value={password}
        onChangeText={setPassword}
      />

        <Button title="Login" onPress={() => sendLogin(login, password)} />
        <Text>{message}</Text>
    </Stack>

  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

