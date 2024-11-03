import { Stack } from '@react-native-material/core';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Surface, IconButton, Text, } from "react-native-paper";

type PasswordEntryProps = {
    application: string,
    password: string,
}

export default function PasswordEntry(props: PasswordEntryProps) {

    const [password, setPassword] = useState(props.password);
    const [hidePassword, setHidePassword] = useState(true);

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