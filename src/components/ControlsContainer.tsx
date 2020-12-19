import React, { memo } from 'react';
import styled from "styled-components/native";

import NeuMorph from "./NeuMorph";
import { GlobalStyles } from "../screens/global/styles";
import { GestureResponderEvent } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";

interface IControls {
    isPlaying: boolean,
    disabled: boolean,
    HandlePlay: (Event : GestureResponderEvent) => void,
    handleBackward: (Event : GestureResponderEvent) => void
}

function Controls({ HandlePlay, handleBackward, isPlaying, disabled } : IControls) {

    console.log("Controls");

    return (
        <ControlsContainer>
            <AlignContainer>
                <NeuMorph size={40} handlePress={handleBackward}>
                    <Entypo 
                        style={{...GlobalStyles.NeonIcon}}
                        name="controller-fast-backward" 
                        size={18} 
                    />
                </NeuMorph>

                <NeuMorph size={60} handlePress={HandlePlay}>
                    {
                    isPlaying ? 
                        <Entypo 
                            style={{...GlobalStyles.NeonIcon}} 
                            name="controller-paus" 
                            size={24} 
                        /> 
                    : 
                        <Entypo 
                            style={{...GlobalStyles.NeonIcon}} 
                            name="controller-play" 
                            size={24} 
                        />
                    }
                </NeuMorph>

                <NeuMorph size={40} handlePress={() => {}}>
                    <Entypo 
                        style={{...GlobalStyles.NeonIcon}} 
                        name="controller-fast-forward" 
                        size={18} 
                    />
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