import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, logout } from '../screens/login/action/loginSlice';

export const storeAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
        console.log("Error storing token: ", error);
    }
};

export const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        return token; // Return token or null
    } catch (error) {
        console.log("Error fetching token: ", error);
        return null;
    }
};

export const checkAuthStatus = () => async (dispatch) => {
    const token = await getAuthToken(); // Get token from AsyncStorage
    const storedCredentials = await AsyncStorage.getItem('userCredentials');
    console.log(token, "token")
    console.log(storedCredentials, "storedCredentials")
    if (token) {
        dispatch(loginSuccess()); // If token exists, log the user in
    } else {
        dispatch(logout()); // If no token, log the user out
    }
};

