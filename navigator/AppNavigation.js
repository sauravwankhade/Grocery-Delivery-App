import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from '../screens/home-page/HomeScreen';
import WelcomeScreen from '../screens/welcome-screen/WelcomeScreen';
import SignUpScreen from '../screens/signup/SignUp';
import VerifyOTPPage from '../screens/login/VerifyOtpPage';
import ForgotPassword from '../screens/login/ForgotPassword';
import LoginPage from '../screens/login/LoginPage';
import MainTabNavigator from './MainTabNavigator';
import LocationScreen from '../screens/header/location/LocationScreen';
import ProductDetailScreen from '../screens/product-detail-page/ProductDetailScreen';
import CategoryScreen from '../screens/home-page/product-category/component/CategoryScreen';
import CommonHeader from '../screens/home-page/product-category/component/CommonHeader';
import CartScreen from '../screens/Cart-screen/CartScreen';
import CardHeader from '../screens/Cart-screen/component/CardHeader';
import { checkAuthStatus } from './helper';
import LoadingScreen from '../components/Loader/LoadingScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {

    //state
    const [isChecked, setIsChecked] = React.useState(false);

    //slice
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    // Check authentication status when the app starts
    React.useEffect(() => {
        const checkAuth = async () => {
            await dispatch(checkAuthStatus(dispatch)); // Check if token exists in AsyncStorage
            setIsChecked(true)
        };
        checkAuth();
    }, [dispatch]);

    // If the app is still checking authentication status, show a loading indicator

    if (!isChecked) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isAuthenticated ? "Main" : "WelcomeScreen"}>
                {/* Screens available only when user is not authenticated */}
                {!isAuthenticated && (
                    <>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="VerifyOtp" component={VerifyOTPPage} options={{ headerShown: false }} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
                    </>
                )}

                {/* Screens available only when user is authenticated */}
                {isAuthenticated && (
                    <>
                        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="CategoryScreen"
                            component={CategoryScreen}
                            options={({ navigation, route }) => ({
                                header: () => <CommonHeader navigation={navigation} title={route.params.title} />,
                            })}
                        />
                        <Stack.Screen
                            name="ProductScreen"
                            component={ProductDetailScreen}
                            options={({ navigation, route }) => ({
                                header: () => <CommonHeader navigation={navigation} title={route.params.title} />,
                            })}
                        />
                        <Stack.Screen
                            name="CardScreen"
                            component={CartScreen}
                            options={({ navigation }) => ({
                                header: () => <CardHeader navigation={navigation} />,
                            })}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
