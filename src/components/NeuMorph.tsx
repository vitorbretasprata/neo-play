import React, { ReactNode, memo, useState } from 'react';
import { View, StyleProp, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Neomorph } from "react-native-neomorph-shadows";

type INeuMorph = {
    children: ReactNode,
    size?: number,
    bgColor?: string,
    handlePress: Function
}

const NeuMorph : React.FC<INeuMorph> = ({ children, size, bgColor, handlePress }) => {

    const [press, setPress] = useState(false);

    const handlePressStart = () => setPress(true);
    const handlePressEnd = () => {
        handlePress();
        setPress(false);
    }
    
    const borderRadiusStyle = size ? size / 2 : 40 / 2 

    return (
        <Neomorph
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            inner={press}
            style={{
                ...styles.neoMorph, 
                borderRadius: borderRadiusStyle,
                width: size || 40,
                backgroundColor: bgColor || '#707070',
                height: size || 40
            }}
        >
            {children}
        </Neomorph>
    )
}

export default memo(NeuMorph);

const styles = StyleSheet.create({
    neoMorph: {
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});