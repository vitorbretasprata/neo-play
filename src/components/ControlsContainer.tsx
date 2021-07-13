import React, { memo } from 'react';
import styled from "styled-components/native";

import NeonIcon from "./NeonIcon";
import { GestureResponderEvent, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";

interface IControls {
    isPlaying: boolean,
    disabled: boolean,
    HandlePlay: (Event : GestureResponderEvent) => void,
    HandlePause: (Event : GestureResponderEvent) => void,
    HandleBackward: (Event : GestureResponderEvent) => void,
    HandleFastfoward: (Event : GestureResponderEvent) => void
}

const Controls : React.FC<IControls> = ({ HandlePlay, HandlePause, HandleBackward, HandleFastfoward, isPlaying, disabled }) => {
    
    console.log("Controls");

    const handleStateTrack = (Event: GestureResponderEvent) => {
        if(isPlaying) {
            HandlePause(Event);
        } else {
            HandlePlay(Event);
        }
    }

    return (
        <AlignContainer>
            <TouchableWithoutFeedback onPress={HandleBackward}>
                <View>
                    <NeonIcon icon={
                        <Entypo 
                            name="loop" 
                            size={22} 
                            style={styles.NeonText}
                        />
                    }/>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={HandleBackward}>
                <View>
                    <NeonIcon icon={
                        <Entypo 
                            name="controller-fast-backward" 
                            size={32} 
                            style={styles.NeonText}
                        />
                    }/>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={handleStateTrack}>
                <CenterIcon>
                    {
                        isPlaying ? 
                            <NeonIcon icon={
                                <Entypo 
                                    style={styles.NeonText}
                                    name="controller-paus" 
                                    size={58} 
                                /> 
                            }/>
                        : 
                            <NeonIcon icon={
                                <Entypo 
                                    style={styles.NeonText}
                                    name="controller-play" 
                                    size={58} 
                                />
                            }/>
                    }
                </CenterIcon>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={HandleFastfoward}>
                <View>
                    <NeonIcon icon={
                        <Entypo 
                            style={styles.NeonText}
                            name="controller-fast-forward" 
                            size={32} 
                        />
                    }/>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={HandleBackward}>
                <View>
                    <NeonIcon icon={
                        <Entypo 
                            name="shuffle" 
                            size={22} 
                            style={styles.NeonText}
                        />
                    }/>
                </View>
            </TouchableWithoutFeedback>
        </AlignContainer>
    );
}

export default memo(Controls);

const CenterIcon = styled.View`
    margin-bottom: 18px;
    z-index: 99;
`;

const AlignContainer = styled.View`
    padding: 0 32px 12px 32px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const styles = StyleSheet.create({
    NeonText: {
        textShadowColor: 'rgba(255, 51, 235, 1)',
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 16,
        elevation: 4,
    }
});