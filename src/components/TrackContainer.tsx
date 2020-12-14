import React, { memo } from 'react';
import styled from "styled-components/native";

import Slider from "@react-native-community/slider";

interface ITrack {
    slidingStarted : () => void, 
    slidingCompleted : (value : number) => void, 
    sliderValue : number 
}

function Track({ slidingStarted, slidingCompleted, sliderValue } : ITrack) {

    console.log("Track", sliderValue);

    return (
        <TrackContainer>
            <AlignContainer>
                <Time>1:21</Time>
                <Slider 
                    style={{ 
                        width: 250, 
                        height: 40 
                    }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#789BFF"
                    value={sliderValue}
                    onSlidingStart={slidingStarted}
                    onSlidingComplete={slidingCompleted}
                />
                <Time>3:51</Time>
            </AlignContainer>
        </TrackContainer>
    );
}

export default memo(Track);

const TrackContainer = styled.View`
    margin: 0 32px 16px 32px;
`;

const AlignContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Time = styled.Text`
    font-size: 10px;
    color: gray;
    font-weight: 700;
`;