import React from 'react';
import styled from "styled-components/native";

import Slider from "@react-native-community/slider";

function Track() {

    console.log("Track");

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
                />
                <Time>3:51</Time>
            </AlignContainer>
        </TrackContainer>        
    );
}

export default Track;

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