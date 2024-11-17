import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStorageService {
    
    storeDataAsObject = async (key: string, value: Object) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
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