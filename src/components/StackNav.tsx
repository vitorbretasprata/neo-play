import React, { PropsWithChildren } from 'react';
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Song from "../screens/song";
import BottomNavigator from "./BottomNavigator";

const Stack = createNativeStackNavigator();

export default function Stacknav() {

    return (
        <Stack.Navigator screenOptions={{ headerShown : false }}>
            <Stack.Screen name="BottomTab" component={BottomNavigator} />
            <Stack.Screen name="Song" component={Song} />
        </Stack.Navigator>
    );
}
