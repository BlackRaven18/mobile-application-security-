import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStorageService {
    storeDataAsString = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error(e);
        }
    };

    storeDataAsObject = async (key: string, value: Object) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    getDataAsString = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (e) {
            console.error(e);
        }
    };

    getDataAsObject = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);

            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e);
        }
    };
}