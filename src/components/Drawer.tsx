import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/home";
import List from "../screens/list";

import DrawerContent from "./CustomDrawer";

import Animated, { interpolate, useSharedValue, useAnimatedStyle } from "react-native-reanimated";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style } : any) => {
    return (
        <Animated.View style={
            [
                { flex: 1 }, 
                style
            ]
        }>
            <Stack.Navigator
                screenOptions={{ 
                    headerShown: false
                }}
            >
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="List" component={List}/>
            </Stack.Navigator>
        </Animated.View>
    );

}

export default () => {
    const progress = useSharedValue(0);

    const style = useAnimatedStyle(() => {
        return {
            borderRadius: interpolate(
                progress.value,
                [0, 1],
                [0, 10]
            ),
            transform: [
                {
                    scale: interpolate(
                        progress.value,
                        [0, 1],
                        [1, 0.8]
                    )
                }
            ]
        };
    }, [progress.value]);

    return (
        <Drawer.Navigator 
            drawerPosition="left"
            drawerType="slide"
            initialRouteName="Home" 
            overlayColor="transparent"
            drawerContentOptions={{
                activeBackgroundColor: "transparent",
                activeTintColor: "green",
                inactiveTintColor: "green"
            }}
            drawerStyle={{ width: "60%", backgroundColor: "transparent" }}
            sceneContainerStyle={{ flex: 1 }}
            drawerContent={DrawerContent}
        >
            <Drawer.Screen name="Screens"> 
                {(props : any) => <Screens {...props} style={style} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
};