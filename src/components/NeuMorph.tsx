import React, { ReactNode, memo, useState } from 'react';
import { StyleSheet } from "react-native";
import { NeomorphBlur  } from "react-native-neomorph-shadows";
import Animated from "react-native-reanimated";

type INeuMorph = {
    children: ReactNode,
    size?: number,
    bgColor?: string,
    handlePress: Function
}

const AnimatedNeomorphBlur = Animated.createAnimatedComponent(NeomorphBlur);

const NeuMorph : React.FC<INeuMorph> = ({ children, size, bgColor, handlePress }) => {

    const [press, setPress] = useState(false);

    const handlePressStart = () => {
        setPress(true);
    }
    const handlePressEnd = () => {
        handlePress();
        setPress(false);
    }
    
    const borderRadiusStyle = size ? size / 2 : 40 / 2 

    return (
        <AnimatedNeomorphBlur 
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}   
            inner={press}         
            style={[
                styles.neoMorph,
                {
                    borderRadius: borderRadiusStyle,
                    width: size || 40,
                    backgroundColor: bgColor || '#707070',
                    height: size || 40
                }
            ]}
        >
            {children}
        </AnimatedNeomorphBlur>
    )
}

export default memo(NeuMorph);

const styles = StyleSheet.create({
    neoMorph: {
        shadowRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
});