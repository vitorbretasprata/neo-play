import React from "react";
import styled from "styled-components/native";

import { Image } from "react-native";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";

import { usePlayerContext } from "../context/RNPlayerTrackContext";

const MiniPlayer : React.FC = () => {

    const values = usePlayerContext();

    const imgUrl = values.currentTrack?.artwork ? { uri: values.currentTrack.artwork } : require("../assets/images/disc-icon.png");

    const handlePlay = () => {
        if(values.isPlaying) {
            values.pause();
        } else {
            values.play();
        }
    }

    if(!values.currentTrack) {
        return null;
    }

    return (
        <MiniPlayerContainer>
            <ImageContainer>
                <Image 
                    source={imgUrl}
                    style={{ transform: [{ scale : 0.8 }] }}                    
                />
            </ImageContainer>

            <MusicTextContainer>
                <TextName>
                    Title
                </TextName>
                <TextArtist>
                    Album
                </TextArtist>
            </MusicTextContainer>

            <IconContainer>
                <TouchableWithoutFeedback onPress={handlePlay}>
                    {
                    values.isPlaying ? 
                        <Entypo 
                            name="controller-paus" 
                            size={32} 
                        /> 
                    : 
                        <Entypo 
                            name="controller-play" 
                            size={32} 
                        />
                    }
                </TouchableWithoutFeedback>
            </IconContainer>
            
        </MiniPlayerContainer>
    )
}


const MiniPlayerContainer = styled.View`
    width: 100%;
    height: 55px;
    padding: 0 20px;
    justify-content: space-between;
    flex-direction: row;
`;

const ImageContainer = styled.View`    
    justify-content: center;
    align-items: center;
`;

const MusicTextContainer = styled.View`
    width: 200px;
    justify-content: space-between;
    flex-direction: column;
`;

const TextName = styled.Text`
    font-size: 18px;
    margin-bottom: 5px;
`;

const TextArtist = styled.Text`
    width: 100%;
    height: 55px;
`;

const IconContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: 55px;
`;

export default MiniPlayer;