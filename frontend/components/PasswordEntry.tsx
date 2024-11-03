import AsyncStorageService from '@/services/AsyncStorageService';
import { Stack } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Surface, IconButton, Text, } from "react-native-paper";

type PasswordEntryProps = {
    application: string,
    password: string,
    refresh: () => void
}

export default function PasswordEntry(props: PasswordEntryProps) {

    const asyncStorageService = new AsyncStorageService();

    const [password, setPassword] = useState(props.password);
    const [hidePassword, setHidePassword] = useState(true);

    const removeEntry = () => {
        asyncStorageService.getDataAsObject("passwords").then((passwords) => {
            if (passwords) {
                const filteredPasswords = passwords.filter((
                    item: { application: string; password: string; }
                ) => item.application !== props.application);

                asyncStorageService.storeDataAsObject("passwords", filteredPasswords).then(() => {
                    console.log("Password removed");
                    props.refresh();
                }).catch((error) => {
                    console.error(error);
                })

            }
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <Surface style={styles.surface} elevation={2}>
            <Stack direction='row' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>{props.application}</Text>
                <Stack direction='row' spacing={5} style={{ alignItems: 'center' }}>
                    <Text>{hidePassword ? '********' : password}</Text>
                    <IconButton
                        mode='contained'
                        icon={hidePassword ? 'eye-off' : 'eye'}
                        size={20}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                    <IconButton
                        mode='contained'
                        icon={'close'}
                        size={20}
                        onPress={() => removeEntry()}
                    />
                </Stack>
            </Stack>
        </Surface>
    )
}

const styles = StyleSheet.create({
    surface: {
        padding: 8,
        justifyContent: 'center',
        width: '90%',
    },
});