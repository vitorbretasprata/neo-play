import React, { memo } from 'react';
import styled from "styled-components/native";

import { Track } from "react-native-track-player";

import NeuMorph from "./NeuMorph";

interface IArtContainer {
    currentTrack: Track
}

function ArtContainer({ currentTrack } : IArtContainer) {
    console.log(currentTrack)
    return (
        <SongContainer>
            <SongArtContainer>
                <SongArt source={require("../assets/images/album.jpeg")} />
            </SongArtContainer>

            <SongInfoContainer>
                <SongArtist>{currentTrack.artist || "N/A"}</SongArtist>
                <SongName>{currentTrack.title || "Titulo"}</SongName>
            </SongInfoContainer>
        </SongContainer>
    );
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
`;

const SongArtist = styled.Text`
    font-size: 30px;
    color: #c3c3c3;
    font-weight: 600;
`;

const SongName = styled.Text`
    font-size: 14px;
    margin-top: 6px;
    color: gray;
    font-weight: 500;
`;

