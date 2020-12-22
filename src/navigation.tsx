import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Drawer from "./components/Drawer";

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
