import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalConfig {
    static get = async (key) => {
        const jsonValue = await AsyncStorage.getItem('config');
        const config = jsonValue != null ? JSON.parse(jsonValue) : {};
        return config[key];
    };

    static set = async (key, value) => {
        const jsonValue = await AsyncStorage.getItem('config');
        const config = jsonValue != null ? JSON.parse(jsonValue) : {};
        config[key] = value;
        await AsyncStorage.setItem('config', JSON.stringify(config));
    }
}