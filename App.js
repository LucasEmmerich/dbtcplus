import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'
import RegisterGlucose from './src/pages/register-glucose';
import Login from './src/pages/login'
import CreateAccount from './src/pages/create-account'
import SignIn from './src/pages/sign-in'
import Main from './src/pages/main'
import DoseCalculator from './src/pages/dose-calculator'
import GlucoseDiary from './src/pages/glucose-diary';

const Stack = createStackNavigator();


function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()

        await Font.loadAsync({
          'Montserrat': require('./src/assets/fonts/montserrat/Montserrat-Regular.ttf'),
          'Montserrat-Bold': require('./src/assets/fonts/montserrat/Montserrat-Bold.ttf')
        });

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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#F96B70',
        }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ title: '', }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: '', }} />
        <Stack.Screen name="Main" component={Main} options={{ title: '', }} />
        <Stack.Screen name="RegisterGlucose" component={RegisterGlucose} options={{ title: 'Registrar', }} />
        <Stack.Screen name="DoseCalculator" component={DoseCalculator} options={{ title: 'Calculadora de Dose', }} />
        <Stack.Screen name="GlucoseDiary" component={GlucoseDiary} options={{ title: 'Histórico', }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;