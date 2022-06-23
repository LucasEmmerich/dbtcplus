import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Toast from 'react-native-toast-message';
import config from './src/storage/localConfig';
import { navigationRef } from './src/Navigation';

import RegisterGlucose from './src/pages/register-glucose';
import Login from './src/pages/login'
import CreateAccount from './src/pages/create-account'
import SignIn from './src/pages/sign-in'
import Main from './src/pages/main'
import DoseCalculator from './src/pages/dose-calculator'
import GlucoseDiary from './src/pages/glucose-diary';

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState('Login');

  const redirectIfAlreadyLoggedIn = async () => {
    const user_status = await config.get('user-status');
    if (user_status === 'authorized') setInitialRouteName('Main');
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()

        await Font.loadAsync({
          'Montserrat': require('./src/assets/fonts/montserrat/Montserrat-Regular.ttf'),
          'Montserrat-Bold': require('./src/assets/fonts/montserrat/Montserrat-Bold.ttf')
        });

        await redirectIfAlreadyLoggedIn();

        await new Promise(resolve => setTimeout(resolve, 2000))

      } catch (error) {
        console.warn(error)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null
  } else {
    onLayoutRootView()
  }

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="RegisterGlucose" component={RegisterGlucose} />
          <Stack.Screen name="DoseCalculator" component={DoseCalculator} />
          <Stack.Screen name="GlucoseDiary" component={GlucoseDiary} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
