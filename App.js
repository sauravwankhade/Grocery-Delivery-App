import React, { useCallback, useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './navigator/AppNavigation';
import store from './store/store';
import theme from './theme/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

  // Load the fonts
  const [fontsLoaded] = useFonts({
    'san': require('./assets/fonts/Poppins-Regular.ttf'),
    'san-medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'san-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </ReduxProvider>
  );
}