import React from "react";
import styled from "styled-components/native";

import { Image, TouchableWithoutFeedback, StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import MusicIcon from "react-native-vector-icons/FontAwesome";

import NeonIcon from "./NeonIcon";

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
        <TouchableWithoutFeedback onPress={handleTrackSelect} style={styles.shadow}>
            <MiniPlayerContainer>

                <LinearGradient 
                    colors={['#6D0BBA', '#450029']}
                    start={{x: 0, y: 0 }} 
                    end={{x: 1, y: 0}}

                    style={styles.gradientContainer}
                >
                    <ImageContainer>
                        <NeonIcon icon={
                            <MusicIcon 
                                name="music" 
                                size={30} 
                                color="white"
                                style={styles.shadow}
                            />
                        }/>
                    </ImageContainer>

                    <MusicTextContainer>
                        <TrackText numberOfLines={1} ellipsizeMode="tail" style={styles.NeonText}>
                            {values.currentTrack?.title}
                        </TrackText>
                        <AuthorText numberOfLines={1} ellipsizeMode="tail">
                            Autor
                        </AuthorText>
                    </MusicTextContainer>

                    <IconContainer>
                        {values.isPlaying && (
                            <TouchableWithoutFeedback onPress={values.pause}>
                                <NeonIcon icon={
                                    <Entypo 
                                        name="controller-paus" 
                                        size={32} 
                                        style={styles.shadow}
                                    />
                                }/>
                            </TouchableWithoutFeedback>
                        )}

                        {!values.isPlaying && (
                            <TouchableWithoutFeedback onPress={() => values.play()}>
                                <NeonIcon icon={
                                    <Entypo 
                                        name="controller-play" 
                                        size={32} 
                                        style={styles.shadow}
                                    />
                                }/>
                            </TouchableWithoutFeedback>
                        )}

                    </IconContainer>

                </LinearGradient>
            </MiniPlayerContainer>
        </TouchableWithoutFeedback>
    );
}


const MiniPlayerContainer = styled.View`
    position: absolute;
    bottom: 65px;
    left: 0;
    right: 0;
    width: 100%;
    height: 55px;
    border-radius: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

const ImageContainer = styled.View`    
    border: 1px solid red;
    justify-content: center;
    align-items: center;
`;

const MusicTextContainer = styled.View`
    max-width: 200px;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
`;

const AuthorText = styled.Text`
    font-size: 11px;
    color: #FF8989;
`

const TrackText = styled.Text`
    font-size: 14px;
`;

const IconContainer = styled.View`
    border: 1px solid red;
    z-index: 20;
    justify-content: center;
    align-items: center;
`;

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        height: "100%",
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingRight: 40
    },
    shadow: {
        textShadowColor: 'rgba(255, 137, 137, 1)',
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 16,
        color: "#FF8989",
        elevation: 4,
        fontWeight: "800"
    },
    NeonText: {
        textShadowColor: 'rgba(255, 51, 235, 1)',
        textShadowOffset: {
            width: -1,
            height: 1
        },
        textShadowRadius: 16,
        color: "#FF33EB",
        elevation: 4,
        fontWeight: "800"
    },
    maxWidth: {
        maxWidth: 200
    }
});

export default MiniPlayer;