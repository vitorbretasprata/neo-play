import MaskedView from '@react-native-community/masked-view';
import styled from "styled-components/native";
import LinearGradient from 'react-native-linear-gradient';
import React from "react";
import { View } from "react-native";

interface INeonIcon {
    icon: any,
    focused? : boolean
}

const NeonIcon : React.FC<INeonIcon> = ({ icon, focused }) => {
    return (
        <MaskedView
            style={{ height: 40, width: 60 }}
            maskElement={
                <View
                    style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}
                >
                    {icon}
                </View>
        }>
            <LinearGradient
                colors={focused ? ['#3360FF', '#89F1FF'] : ['#FF8989', '#FF33EB']}
                style={{ flex: 1 }}
            />
        </MaskedView>
    )
}

export default NeonIcon;
