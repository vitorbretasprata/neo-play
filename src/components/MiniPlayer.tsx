import React from "react";
import styled from "styled-components/native";

import { Image, TouchableWithoutFeedback } from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import { usePlayerContext } from "../context/RNPlayerTrackContext";

import { BottomTabBarProps, BottomTabBarOptions } from "@react-navigation/bottom-tabs";

const MiniPlayer : React.FC<BottomTabBarProps<BottomTabBarOptions>> = ({ navigation }) => {

    const values = usePlayerContext();

    const imgUrl = values.currentTrack?.artwork ? { uri: values.currentTrack.artwork } : require("../assets/images/disc-icon.png");

    const handleTrackSelect = () => navigation.navigate("Song");

    if(values.isEmpty || !values.currentTrack) {
        return null;
    }
    
    return (
        <TouchableWithoutFeedback onPress={handleTrackSelect}>
            <MiniPlayerContainer>
                <ImageContainer>
                    <Image 
                        source={imgUrl}
                        style={{ transform: [{ scale : 0.8 }] }}                    
                    />
                </ImageContainer>

                <MusicTextContainer>
                    <TextName numberOfLines={1} ellipsizeMode='tail'>
                        {values.currentTrack?.title}
                    </TextName>
                </MusicTextContainer>

                <IconContainer>
                    {values.isPlaying && (
                        <TouchableWithoutFeedback onPress={values.pause}>
                            <Entypo 
                                name="controller-paus" 
                                size={32} 
                            />
                            
                        </TouchableWithoutFeedback>
                    )}

                    {!values.isPlaying && (
                        <TouchableWithoutFeedback onPress={() => values.play()}>
                            <Entypo 
                                name="controller-play" 
                                size={32} 
                            />
                        </TouchableWithoutFeedback>
                    )}                            
                    
                </IconContainer>
                
            </MiniPlayerContainer>
        </TouchableWithoutFeedback>        
    );
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
    justify-content: center;
    align-items: flex-start;
`;

const TextName = styled.Text`
    font-size: 18px;
    margin-bottom: 5px;
`;

const IconContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: 55px;
`;

export default MiniPlayer;