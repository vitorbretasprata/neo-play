import React, { memo, useState } from 'react';
import styled from "styled-components/native";
import { Text } from "react-native";

import { GlobalStyles } from "../screens/global/styles";
import { ProgressComponent } from "react-native-track-player";
import { usePlayerContext } from '../context/RNPlayerTrackContext';


import Slider from "@react-native-community/slider";

interface ITrack {
    slidingStarted : () => void, 
    slidingCompleted : (value : number) => void, 
    sliderValue : number ,
    songTime: number,
}

function convertTime(totalSeconds : number) : string {

    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minute = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const minuteStr = String(minute).padStart(2, "0");
    const secondsStr = String(seconds).padStart(2, "0");

    if(hours > 0) {
        return `${hours}:${minuteStr}:${secondsStr}`;
    } 

    return `${minuteStr}:${secondsStr}`;
}

const Track : React.FC<ITrack> = ({ sliderValue, slidingCompleted, slidingStarted, songTime }) => {

    return (
        <TrackContainer>
            <AlignContainer>
                <Text style={{...GlobalStyles.MiniNeonText}}>{convertTime(sliderValue)}</Text>
                <Text style={{...GlobalStyles.MiniNeonText}}>{convertTime(songTime)}</Text>
            </AlignContainer>
            <StyledSlider
                minimumValue={0}
                maximumValue={songTime}
                onSlidingStart={slidingStarted}
                onSlidingComplete={slidingCompleted}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#789BFF"
                value={sliderValue}                      
            />
        </TrackContainer>
    )
}

export default memo(Track);

const StyledSlider = styled(Slider)`
    width: 100%;
    height: 30px;
`;

const TrackContainer = styled.View`
    margin: 0 32px 16px 32px;
`;

const AlignContainer = styled.View`
    padding: 0 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Time = styled.Text`
    font-size: 10px;
    color: gray;
    font-weight: 700;
`;