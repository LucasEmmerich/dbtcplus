import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/home';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Toast ref={(ref) => Toast.setRef(ref)} style={{ zIndex: 9999, top: -45 }} />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;