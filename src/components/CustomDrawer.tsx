import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Foundation from "react-native-vector-icons/Foundation";

import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";

export default (props : any) => {

    return (
        <DrawerContentScrollView>
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
    );
}