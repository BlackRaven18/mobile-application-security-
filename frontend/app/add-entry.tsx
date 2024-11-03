import AsyncStorageService from "@/services/AsyncStorageService";
import { Stack } from "@react-native-material/core";
import { router } from "expo-router/build/imperative-api";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";

export default function AddEntryScreen() {

    const asyncStorageService = new AsyncStorageService();

    const [applicationName, setApplicationName] = useState("");
    const [password, setPassword] = useState("");

    const handleAddEntry = () => {

        if (applicationName === "" || password === "") {
            alert("Application name and password cannot be empty");
            return;
        }

        const data =
        {
            application: applicationName,
            password: password
        }

        asyncStorageService.getDataAsObject("passwords").then((passwords) => {
            if (passwords) {
                passwords.push(data);
                asyncStorageService.storeDataAsObject("passwords", passwords).finally(() => {
                    console.log("Password added");
                    router.back();
                })
                .catch((error) => {
                    console.error(error);
                })
            } else {
                asyncStorageService.storeDataAsObject("passwords", [data]).then(() => {
                    console.log("Password added");
                    router.back();
                })
                .catch((error) => {
                    console.error(error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
        })
        

    };

    return (
        <Stack direction="column" spacing={5} style={{ padding: 20 }}>
            <TextInput
                mode="outlined"
                label="Application name"
                value={applicationName}
                onChangeText={setApplicationName}
            />
            <TextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={setPassword}
            />

            <Button
                mode="contained"
                onPress={() => handleAddEntry()}
            >
                Add Entry
            </Button>
        </Stack>
    )
}