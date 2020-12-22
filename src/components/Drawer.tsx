import React, { useState } from "react";
import styled from "styled-components";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Foundation from "react-native-vector-icons/Foundation"

import Home from "../screens/home";
import List from "../screens/list";

import Animated, { interpolate } from "react-native-reanimated";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerContent = (props : any) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem 
                label="Home"
                onPress={() => props.navigation.navigate("Home")}
                icon={() => <Foundation name="music" size={16} />}
            />
            <DrawerItem 
                label="List"
                onPress={() => props.navigation.navigate("List")}
                icon={() => <Foundation name="list" size={16} />}
            />
        </DrawerContentScrollView>
    )
}

const Screens = ({ navigation, style } : any) => {
    return (
        <Animated.View style={[{ flex: 1 }, style]}>
            <Stack.Navigator
                screenOptions={{ 
                    headerShown: false
                }}
            >
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="List" component={List}/>
            </Stack.Navigator>
        </Animated.View>
    )

}

export default () => {
    const [progress, setProgress] = useState(0);

    const scale = interpolate(
        0,
        [0, 1],
        [1, 0.8]
    );

    const borderRadius = interpolate(
        0,
        [0, 1],
        [0, 10]
    );

    const screenStyle = { borderRadius, transform: [{ scale }]};
    
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
            drawerStyle={{ width: "50%", activeBackgroundColor: "transparent" }}
            sceneContainerStyle={{ flex: 1 }}
            drawerContent={
                (props : any) => {
                    setProgress(props.progress);
                    return <DrawerContent {...props}/>;
                }
            }
        >
            <Drawer.Screen name="Screens"> 
                {(props : any) => <Screens {...props} style={screenStyle} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
};