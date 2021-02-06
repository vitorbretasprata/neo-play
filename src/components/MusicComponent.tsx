import React, { useState } from 'react';

import styled from "styled-components/native";
import { Track } from 'react-native-track-player';
import { TouchableOpacity } from "react-native";

interface SongInfo {
    index: number,
    item: Track,
    onTouch: Function
}

const MusicComponent : React.FC<SongInfo> = ({ index, item, onTouch }) => {

    const handlePress = () => onTouch(item);

    return (
        <TouchableOpacity onPress={handlePress}>
            <MusicContainer accessible>
                <Text numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
            </MusicContainer>
        </TouchableOpacity>
    );
}

export default MusicComponent;

const MusicContainer = styled.View`
    justify-content: center;
    align-items: flex-start;
    padding-left: 20px;
    padding-right: 15px;
    height: 60px;
`

const Text = styled.Text`
    color: #999;
    font-size: 18px;
`