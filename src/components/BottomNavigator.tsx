import React from "react";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Download from "../screens/download";
import List from "../screens/list";
import MiniPlayer from "./MiniPlayer";

import Foundation from "react-native-vector-icons/Foundation";
import Animated, { interpolate, useSharedValue, useAnimatedStyle } from "react-native-reanimated";

const ICON_SIZE = 24;

const MainTabs = createBottomTabNavigator();

export default () => {
    
    return (
        <MainTabs.Navigator
        tabBar={(tabsProps) => (
            <>
                <MiniPlayer />
                <BottomTabBar {...tabsProps} />
            </>
        )}
            tabBarOptions={{
                activeTintColor: "lightblue"
            }}
        >
            <MainTabs.Screen 
                name="List"
                component={List}
                options={{
                    tabBarIcon: (props) =>
                        <Foundation 
                            color={props.color}
                            name="list" 
                            size={ICON_SIZE} 
                        />                    
                }}
            />
            <MainTabs.Screen 
                name="Download"
                component={Download}
                options={{
                    tabBarIcon: (props) =>
                        <Foundation 
                            color={props.color}
                            name="download" 
                            size={ICON_SIZE} 
                        />                    
                }}
            />
        </MainTabs.Navigator>        
    )
};