import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/login'
import CreateAccount from './src/pages/create-account'
import SignIn from './src/pages/sign-in'
import Main from './src/pages/main'
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'


SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

const Stack = createStackNavigator();

function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()

        await Font.loadAsync({
          'Montserrat': require('./src/fonts/montserrat/Montserrat-Regular.ttf'),
          'Montserrat-bold': require('.')
        })

        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (error) {
        console.warn(e)
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

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;