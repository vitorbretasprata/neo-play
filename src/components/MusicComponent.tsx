import React, { memo } from 'react';

import styled from "styled-components/native";
import { Track } from 'react-native-track-player';
import MusicIcon from "react-native-vector-icons/FontAwesome";

import NeonIcon from "./NeonIcon";

import { TouchableOpacity, View, StyleSheet } from "react-native";

interface SongInfo {
    index: number,
    item: Track,
    onTouch: (item : Track) => void
}

const MusicComponent : React.FC<SongInfo> = ({ index, item, onTouch }) => {

    const switchSong = () => onTouch(item);

    return (
        <TouchableOpacity onPress={switchSong}>
            <MusicContainer accessible>
                <FlexWrap>
                    <FlexContainer>
                        <NeonIcon icon={
                            <MusicIcon 
                                name="music" 
                                size={30} 
                                color="white"
                                style={styles.shadow}
                            />
                        }/>
                        <View style={styles.maxWidth}>
                            <TrackText numberOfLines={1} ellipsizeMode="tail" style={styles.NeonText}>
                                {item.title}
                            </TrackText>
                            <AuthorText numberOfLines={1} ellipsizeMode="tail">
                                Autor
                            </AuthorText>
                        </View>
                    </FlexContainer>

                    <View>
                        <TrackText></TrackText>
                    </View>
                </FlexWrap>
            </MusicContainer>
        </TouchableOpacity>
    );
}

export default memo(MusicComponent);

const MusicContainer = styled.View`
    justify-content: center;
    align-items: flex-start;
    padding-right: 15px;
    height: 60px;
`

const TrackText = styled.Text`
    font-size: 14px;
    color: #FF33EB;
`

const AuthorText = styled.Text`
    font-size: 11px;
    color: #FF8989;
`

const FlexWrap = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const FlexContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const styles = StyleSheet.create({
    shadow: {
        textShadowColor: 'rgba(47, 214, 224, 1)',
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 16,
        color: "#6ef6ff",
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
        elevation: 4,
        fontWeight: "800"
    },
    maxWidth: {
        maxWidth: 200
    }
});