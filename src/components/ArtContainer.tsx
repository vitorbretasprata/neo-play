import React, { memo, useEffect, useState } from 'react';
import { InteractionManager, StyleSheet } from "react-native";
import styled from "styled-components/native";

import Entypo from "react-native-vector-icons/Entypo";
import { Track } from "react-native-track-player";

import NeonIcon from "./NeonIcon";

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
                <SongArtContainer style={styles.shadow}>
                    <NeonIcon icon={
                        <Entypo 
                            name="controller-play" 
                            size={78} 
                            style={styles.NeonText}
                        />
                    } />
                </SongArtContainer>

                <SongInfoContainer>
                    <SongArtist numberOfLines={1} ellipsizeMode='tail' style={styles.NeonText}>
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
    border: 3px solid #FF8989;
    width: 250px;
    height: 250px;
    border-radius: 125px;
    margin: 0 auto;
    padding: 0;
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
    font-size: 18px;
    padding: 5px 0px;
    color: #FF65F0;
    font-weight: 600;
`;

const SongName = styled.Text`
    font-size: 14px;
    margin-top: 6px;
    color: gray;
    font-weight: 500;
`;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#FF6363',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 4,
    },
    NeonText: {
        textShadowColor: 'rgba(255, 51, 235, 1)',
        textShadowOffset: {
            width: -1,
            height: 1
        },
        textShadowRadius: 16,
        elevation: 4,
        fontWeight: "800"
    }
});