import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
import { Button } from 'react-native-paper';

interface LocationCoords {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export default function App() {
    const [location, setLocation] = useState<LocationCoords | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [permision, setPermision] = useState<Location.PermissionStatus | null>(null);

    const requestPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        setPermision(status);

        return status
    }

    async function getCurrentLocation(status: string) {
        if (Platform.OS === 'android' && !Device.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
            );
            return;
        }

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied. It is required to use this feature.');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }

    useEffect(() => {

        if (permision === 'granted') {
            getCurrentLocation(permision);
        }
    }, [permision]);

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    if (location) {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={location as Region}
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="You are here"
                    />
                </MapView>
            </View>
        )
    }



    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>{text}</Text>
            {permision !== 'granted'
                && <Button mode='contained' onPress={requestPermission}>Request Permission</Button>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
