import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/HomeScreen';
import MarkScreen from './src/MarkScreen';
import RegisterScreen from './src/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menú Principal' }} />
        <Stack.Screen name="Mark" component={MarkScreen} options={{ title: 'Form de Marcación' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro de Usuario' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;