import React, { memo, useEffect, useState } from 'react';
import { InteractionManager } from "react-native";
import styled from "styled-components/native";

import { Track } from "react-native-track-player";

interface IArtContainer {
    currentTrack: Track
}

const ArtContainer : React.FC<IArtContainer> = ({ currentTrack }) => {

    const [renderCompleted, setRenderCompleted] = useState(false);

    console.log("Art")

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setRenderCompleted(true);
        })
    }, []);

    if(renderCompleted) {
        return (
            <SongContainer>
                <SongArtContainer>
                    <SongArt source={require("../assets/images/disc-icon.png")} />
                </SongArtContainer>
    
                <SongInfoContainer>
                    <SongArtist numberOfLines={1} ellipsizeMode='tail'>
                        {(currentTrack && currentTrack.title) && currentTrack.title}
                    </SongArtist>
                    
                </SongInfoContainer>
            </SongContainer>
        );
    }

    return null;    
}

export default memo(ArtContainer);

const SongContainer = styled.View`
    margin: 24px 0 0 0;
`;

const SongArtContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SongArt = styled.Image`
    width: 250px;
    height: 250px;
    border-radius: 125px;
    border-color: #000;
    border-width: 10px;
`;

const SongInfoContainer = styled.View`
    align-items:center;
    margin-top: 32px;
    padding: 0 16px;
`;

const SongArtist = styled.Text`
    font-size: 25px;
    padding: 5px 0px;
    color: #c3c3c3;
    font-weight: 600;
`;

const SongName = styled.Text`
    font-size: 14px;
    margin-top: 6px;
    color: gray;
    font-weight: 500;
`;

