import React, { memo } from 'react';

import styled from "styled-components/native";
import { Track } from 'react-native-track-player';

import { TouchableOpacity } from "react-native";

interface SongInfo {
    index: number,
    item: Track,
    onTouch: (item : Track) => void
}

const MusicComponent : React.FC<SongInfo> = ({ index, item, onTouch }) => {

    const switchSong = () => onTouch(item);

    console.log(index);

    return (
        <TouchableOpacity onPress={switchSong}>
            <MusicContainer accessible>
                <Text numberOfLines={1} ellipsizeMode="tail">{index} - {item.title}</Text>
            </MusicContainer>
        </TouchableOpacity>
    );
}

export default memo(MusicComponent);

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