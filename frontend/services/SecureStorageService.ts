import * as SecureStore from 'expo-secure-store';

export default class SecureStorageService {
    storeDataAsObject = async (key: string, value: Object) => {
        try {
            const jsonValue = JSON.stringify(value);
            await SecureStore.setItemAsync(key, jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    getDataAsObject = async (key: string) => {
        try {
            const jsonValue = await SecureStore.getItemAsync(key);

            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e);
        }
    };
}