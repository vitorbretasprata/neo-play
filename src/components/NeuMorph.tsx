import React, { ReactNode, memo, useState } from 'react';
import { View, StyleProp, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Neomorph } from "react-native-neomorph-shadows";

type INeuMorph = {
    children: ReactNode,
    size?: number,
    style?: StyleProp<object>,
    handlePress: Function
}

const NeuMorph : React.FC<INeuMorph> = ({ children, size, style, handlePress }) => {

    const [press, setPress] = useState(false);

    const handlePressStart = () => setPress(true);
    const handlePressEnd = () => {
        handlePress();
        setPress(false);
    }

    console.log("NeuMorph");

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
        shadowRadius: 10,
        backgroundColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center'
    }
});