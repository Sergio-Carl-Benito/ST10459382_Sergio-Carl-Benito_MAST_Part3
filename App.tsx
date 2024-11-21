import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './Screens/MenuContext';
import HomeScreen from './Screens/HomeScreen';
import AddMenuItemScreen from './Screens/AddMenuScreen';
import FilterMenuScreen from './Screens/FilterMenuScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
          <Stack.Screen name="FilterMenu" component={FilterMenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}