import React, { memo } from 'react';
import styled from "styled-components/native";

import NeuMorph from "./NeuMorph";
import { GestureResponderEvent } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";

interface IControls {
    isPlaying: boolean,
    disabled: boolean,
    HandlePlay: (Event : GestureResponderEvent) => void,
    HandleFastFoward: (Event : GestureResponderEvent) => void,
    HandleRewind: (Event : GestureResponderEvent) => void 
}

function Controls({ HandlePlay, HandleRewind, HandleFastFoward, isPlaying, disabled } : IControls) {

    console.log("Controls");

    return (
        <ControlsContainer>
            <AlignContainer>
                <NeuMorph size={40} handlePress={HandleRewind}>
                    
                </NeuMorph>

                <NeuMorph size={60} handlePress={HandlePlay}>
                    <Entypo name="controller-play" size={24} color="#eee" />
                </NeuMorph>

                <NeuMorph size={40} handlePress={HandleFastFoward}>
                    
                </NeuMorph>
            </AlignContainer>
        </ControlsContainer>
    );
}

export default memo(Controls);

const ControlsContainer = styled.View`
    margin: 0 64px;
`;

const AlignContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;