import React, { memo } from 'react';
import styled from "styled-components/native";

import NeuMorph from "./NeuMorph";
import { GlobalStyles } from "../screens/global/styles";
import { GestureResponderEvent } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";

interface IControls {
    isPlaying: boolean,
    disabled: boolean,
    HandlePlay: (Event : GestureResponderEvent) => void
    
}

function Controls({ HandlePlay, isPlaying, disabled } : IControls) {

    console.log("Controls");

    return (
        <ControlsContainer>
            <AlignContainer>
                <NeuMorph size={40} handlePress={() => {}}>
                    <Entypo name="controller-fast-backward" size={18} color="#eee" />
                </NeuMorph>

                <NeuMorph size={60} handlePress={HandlePlay}>
                    {isPlaying ? <Entypo style={{...GlobalStyles.NeonText}} name="controller-paus" size={24} color="#eee" /> : <Entypo name="controller-play" size={24} color="#eee" />}
                    
                </NeuMorph>

                <NeuMorph size={40} handlePress={() => {}}>
                    <Entypo name="controller-fast-forward" size={18} color="#eee" />
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