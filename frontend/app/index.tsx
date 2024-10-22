import { Button, IconButton, Stack, Text, TextInput } from "@react-native-material/core";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";

export default function Index() {

  const forbiddenChars = ["/", "\\", ":", "*", "?", "\"", "<", ">", "|"];
  const backendUrl = "http://192.168.4.164:3000";
  // const backendUrl = "http://localhost:3000";

  const [message, setMessage] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLoginFieldChange = (value: string) => {
    if (forbiddenChars.some((char) => value.includes(char))) {
      setMessage("Forbidden characters in login field");
      return;
    }

    setLogin(value);
  }

  const onPasswordFieldChange = (value: string) => {
    if (forbiddenChars.some((char) => value.includes(char))) {
      setMessage("Forbidden characters in password field");
      return;
    }

    setPassword(value);
  }

  const validateLoginData = (login: string, password: string) => {
    if (login === "" || password === "") {
      setMessage("Login and password cannot be empty");
      return false;
    }
    return true;
  }

  const sendLogin = (login: string, password: string) => {
    if (!validateLoginData(login, password)) {
      return;
    }
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
    <Stack spacing={2} style={{ margin: 16 }}>
      <TextInput
        label="Login"
        leading={props => <Icon name="account" {...props} />}
        value={login}
        onChangeText={onLoginFieldChange}
      />
      <TextInput
        label="Password"
        variant="outlined"
        trailing={props => (
          <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
        )}
        value={password}
        onChangeText={onPasswordFieldChange}
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

