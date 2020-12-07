import React, { ReactNode, memo } from 'react';
import { View, StyleProp, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Shadow } from "react-native-neomorph-shadows";

type INeuMorph = {
    children: ReactNode,
    size?: number,
    style?: StyleProp<object>
}

const NeuMorph : React.FC<INeuMorph> = ({ children, size, style }) => {

    console.log("NeuMorph");

    const borderRadiusStyle = {
        borderRadius: size ? size / 2 : 40 / 2 
    }

    return (
       
        <Shadow
            style={{
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 1,
                shadowColor: "grey",
                shadowRadius: 10,
                borderRadius: 20,
                backgroundColor: 'white',
                width: 100,
                height: 100,
            }}
        >
            {children}
        </Shadow>
    )
}

export default memo(NeuMorph);

const styles = StyleSheet.create({
    topShadow: {
        borderRadius: 20,
        shadowOffset: {
            width: -6,
            height: -6
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: "#606060",
        elevation: 3,
        backgroundColor: "#0000"
    },
    bottomShadow: {
        borderRadius: 20,
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: "#828282",
        elevation: 3,
        backgroundColor: "#0000"
    },
    inner: {
        backgroundColor: "#474747",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#474747",
        borderWidth: 1
    }
});