import PasswordEntry from '@/components/PasswordEntry';
import AsyncStorageService from '@/services/AsyncStorageService';
import SecureStorageService from '@/services/SecureStorageService';
import { Stack } from '@react-native-material/core';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';


type PasswordData = {
    application: string,
    password: string,
}

export default function HomeScreen() {

    const [data, setData] = useState<PasswordData[]>([]);
    const secureStorageService = new SecureStorageService();
    const asyncStorageService = new AsyncStorageService();

    const loadData = () => {
        secureStorageService.getDataAsObject("passwords").then((value) => {
            if (value) {
                setData(value);
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    useFocusEffect(() => {
        loadData();
    })

    const refresh = () => {
        loadData();
    }

    return (
        <Stack direction="column" style={
            {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {data.map((item, index) =>
                <PasswordEntry
                    key={index}
                    application={item.application}
                    password={item.password}
                    refresh={refresh}
                />
            )}

            <IconButton
                mode="contained"
                icon="plus"
                size={20}
                onPress={() => router.push("/add-entry")}
            />
        </Stack>
    )
}
