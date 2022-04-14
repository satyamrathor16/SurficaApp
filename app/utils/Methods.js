import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../config';
const showToast = (message, description, type = 1) => {
    if (type == 1) {
        Toast.show({
            type: 'success',
            text1: message,
            text2: description
        });
    }
    if (type == 2) {
        Toast.show({
            type: 'error',
            text1: message,
            text2: description
        });
    }
}

const AsyncStore = {
    setData: async (key, value) => {
        await AsyncStorage.setItem(key, value)
    },
    getData: async (key) => {
        const data = await AsyncStorage.getItem(key)
        return data
    },
    removeData: async (key) => {
        await AsyncStorage.removeItem(key)
    }
}

const onLogout = () => {
    AsyncStore.removeData(Config.Constants.ASYNC_KEY_USER_TOKEN);
    AsyncStore.removeData(Config.Constants.ASYNC_KEY_ROLE);
}

const emailValidation = (email) => {
    return Config.Constants.EMAIL_REGEX.test(email);
}

export default {
    showToast,
    AsyncStore,
    onLogout,
    emailValidation
}