import React from "react";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Download from "../screens/download";
import List from "../screens/list";
import MiniPlayer from "./MiniPlayer";
import NeonIcon from "./NeonIcon";

import Foundation from "react-native-vector-icons/Foundation";
import { StyleSheet } from "react-native";

const ICON_SIZE = 28;

const MainTabs = createBottomTabNavigator();

export default (props : any) => {

    return (
        <MainTabs.Navigator

            tabBar={(tabsProps) => (
                <>
                    <MiniPlayer
                        {...tabsProps}
                    />
                    <BottomTabBar {...tabsProps} />
                </>
            )}

            tabBarOptions={{
                style: styles.BottomTabBar,
                showLabel: false,
                activeTintColor: "lightblue"
            }}
        >
            <MainTabs.Screen 
                name="List"
                component={List}
                options={{
                    tabBarIcon: (props) =>
                        <NeonIcon icon={
                            <Foundation 
                                color={props.color}
                                name="list" 
                                size={ICON_SIZE} 
                            />}
                            focused={props.focused}
                        />
                }}
            />
            <MainTabs.Screen 
                name="Download"

                component={Download}
                options={{
                    tabBarIcon: (props) =>
                        <NeonIcon icon={
                            <Foundation 
                                color={props.color}
                                name="download" 
                                size={ICON_SIZE} 
                            />}
                            focused={props.focused}
                        />
                }}
            />
        </MainTabs.Navigator>
    )
};

const styles = StyleSheet.create({
    BottomTabBar: {
        backgroundColor: "transparent",
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 50
    }
});
