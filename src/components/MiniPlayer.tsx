import React from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import MusicIcon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

import NeonIcon from "./NeonIcon";
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
        <MiniPlayerContainer 
            colors={['#6D0BBA', '#450029']}
            start={ {x: 0, y: 0 }} 
            end={{ x: 1, y: 0 }}

            style={styles.shadow}
        >
            <TouchableWithoutFeedback onPress={handleTrackSelect}>
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
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={handleTrackSelect}>
                <MusicTextContainer>
                    <TrackText numberOfLines={1} ellipsizeMode="tail" style={styles.NeonText}>
                        {values.currentTrack?.title}
                    </TrackText>
                    <AuthorText numberOfLines={1} ellipsizeMode="tail">
                        Autor
                    </AuthorText>
                </MusicTextContainer>
            </TouchableWithoutFeedback>


            <IconContainer>
                {values.isPlaying && (
                    <TouchableWithoutFeedback onPress={values.pause}>
                        <View>
                            <NeonIcon icon={
                                <Entypo 
                                    name="controller-paus" 
                                    size={32} 
                                    style={styles.shadow}
                                />
                            }/>
                        </View>
                    </TouchableWithoutFeedback>
                )}

                {!values.isPlaying && (
                    <TouchableWithoutFeedback onPress={() => values.play()}>
                        <View>
                            <NeonIcon icon={
                                <Entypo 
                                    name="controller-play" 
                                    size={32} 
                                    style={styles.shadow}
                                />
                            }/>
                        </View>
                    </TouchableWithoutFeedback>
                )}

            </IconContainer>
        </MiniPlayerContainer>
        
    );
}

const MiniPlayerContainer = styled(LinearGradient)`
    position: absolute;
    bottom: 65px;
    width: 100%;
    height: 55px;
    border-radius: 50px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 5px 40px 0 20px;
`;

const ImageContainer = styled.View`    
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
    z-index: 20;
    justify-content: center;
    align-items: center;
`;

const styles = StyleSheet.create({
    shadow: {
        textShadowColor: 'rgba(255, 137, 137, 1)',
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 16,
        color: "#FF8989",
        elevation: 8,
        fontWeight: "800",
        backgroundColor : "#0000"
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