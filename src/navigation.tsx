import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./screens/home";
import List from "./screens/list";

import Drawer from "./components/Drawer";

const Stack = createStackNavigator();

const NavigationOptions = {
  headerShown: false 
}

export default function Navigation() {

    return (
      <NavigationContainer>
          <Drawer />
          <Stack.Navigator screenOptions={NavigationOptions}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="List" component={List} />
          </Stack.Navigator>
      </NavigationContainer>
    );
}
