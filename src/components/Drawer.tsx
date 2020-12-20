import React, { memo } from "react";
import styled from "styled-components";
import { createDrawerNavigator } from "@react-navigation/drawer";

import List from "../screens/list";

const Drawer = createDrawerNavigator();

export default memo(() => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="List" component={List} />
        </Drawer.Navigator>
    )
});