import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
    constructor(key) { this.key = key };
    load = async () => {
        const jsonValue = await AsyncStorage.getItem(this.key);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    }
    save = async (data) => {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(this.key, jsonValue);
    }
}

export default Storage;