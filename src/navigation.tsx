import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Drawer from "./components/Drawer";

const Stack = createStackNavigator();

const NavigationOptions = {
  headerShown: false 
}

export default function Navigation() {

    return (
      <NavigationContainer>
          <Drawer />
      </NavigationContainer>
    );
}
