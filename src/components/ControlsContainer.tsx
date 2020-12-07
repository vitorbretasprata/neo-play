import React, { useEffect } from 'react';
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import NeuMorph from "./NeuMorph";
import { GestureResponderEvent } from 'react-native';

interface IControls {
    isPlaying: boolean,
    HandlePlay: (Event : GestureResponderEvent) => void,
    HandleFastFoward: (Event : GestureResponderEvent) => void,
    HandleRewind: (Event : GestureResponderEvent) => void 
}

function Controls({ HandlePlay, HandleRewind, HandleFastFoward, isPlaying } : IControls) {

    console.log("Controls");

    return (
        <ControlsContainer>
            <AlignContainer>
                <TouchableWithoutFeedback onPress={HandleRewind}>
                    <NeuMorph size={40}>
                    </NeuMorph>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={HandlePlay}>
                    <NeuMorph size={60}>
                        
                    </NeuMorph>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback onPress={HandleFastFoward}>
                    <NeuMorph size={40}>
                    </NeuMorph>
                </TouchableWithoutFeedback>

            </AlignContainer>
        </ControlsContainer>        
    );
}

export default Controls;

const ControlsContainer = styled.View`
    margin: 0 64px;
`;

const AlignContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;