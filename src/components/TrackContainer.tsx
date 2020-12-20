import React, { memo } from 'react';
import styled from "styled-components/native";
import { Text } from "react-native";

import { GlobalStyles } from "../screens/global/styles";

import Slider from "@react-native-community/slider";

interface ITrack {
    slidingStarted : () => void, 
    slidingCompleted : (value : number) => void, 
    sliderValue : number ,
    songTime: number,
    currentTime: number
}

function Track({ slidingStarted, slidingCompleted, sliderValue, currentTime, songTime } : ITrack) {

    return (
        <TrackContainer>
            <AlignContainer>
                <Text style={{...GlobalStyles.MiniNeonText}}>1:21</Text>
                <Text style={{...GlobalStyles.MiniNeonText}}>3:51</Text>
            </AlignContainer>
            <StyledSlider
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#789BFF"
                value={sliderValue}
                onSlidingStart={slidingStarted}
                onSlidingComplete={slidingCompleted}
            />
        </TrackContainer>
    );
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