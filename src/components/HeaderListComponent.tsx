import React from 'react';
import styled from "styled-components/native";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import { TextInput, TouchableWithoutFeedback } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDecay } from "react-native-reanimated";

const HeaderListComponent : React.FC = () => {
    const width = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: width.value
        }
    });

    const handleOpening = () => {
        width.value = withDecay({
            velocity: 1,
            deceleration: 1,
            clamp: [0, 250]
        });
    }

    return (
        <MarginSpace>
            
        </MarginSpace>
    );
}

export default HeaderListComponent;

const InputContainer = styled.View`
    background-color: #ddd;
    height: 50px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(InputContainer);

const ButtonContainer = styled.Button`
    background-color: #fff;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
`;

const MarginSpace = styled.View`    
    width: 100%;
    height: 64px;
    justify-content: center;
    align-items: flex-end;
    padding: 0 24px;
    background-color: #808080;
`;

const TopContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
`;

/**
 * 
 * 
 * <TopContainer>
                <AnimatedContainer style={animatedStyles}>
                    <TextInput />
                </AnimatedContainer>
                <TouchableWithoutFeedback onPress={handleOpening}>
                    <EvilIcons 
                        name="search"
                        size={30}
                        color={"#eee"}
                    
                    />
                </TouchableWithoutFeedback>
                    
            </TopContainer>
 */