import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './screens/HomeScreen';
import { SaveBadgeModal } from './screens/SaveBadgeModal';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Badge Keeper' }}></Stack.Screen>
        <Stack.Screen name='SaveBadge' component={SaveBadgeModal} options={{ presentation: 'modal', title: 'Badge Keeper' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;