import { useState, useReducer, useCallback, DispatchWithoutAction, useEffect } from "react";
import constants from "../constants/index";

import * as MediaLibrary from "expo-media-library";
import TrackPlayer from 'react-native-track-player';
interface IMusicTrack {
    shouldPlay: boolean,
    isTrackInit: boolean,
    rate: number,
    shouldCorrectPitch: boolean,
    volume: number,
    isMuted: boolean,
    isPlaying: boolean
}

interface IAction {
    type: string,
    payload : any
}

interface IReducer {
    reducer: IMusicTrack,
    dispatch: DispatchWithoutAction
}

const initState = {
    shouldPlay: false,
    isTrackInit: false,
    rate: 1.0,
    shouldCorrectPitch: true,
    volume: 1.0,
    isMuted: false,
    isPlaying: false
}

const { UPDATE_PLAYING, UPDATE_BUFFERING, SET_INIT } = constants;

const reducer = (state : IMusicTrack, action : IAction) => {

    switch(action.type) {
        case UPDATE_PLAYING: 
            return {
                ...state,
                isPlaying: action.payload.isPlaying
            }

        case UPDATE_BUFFERING: 
            return {
                ...state,
                isBuffering: action.payload.isBuffering
            }
        default: 
            return state;
    }   
}

const trackPlayerInit = async () => {
    try {
        await TrackPlayer.setupPlayer();

        const songs : MediaLibrary.PagedInfo<MediaLibrary.Asset> = await _getMusics();

        const musicsInfo = songs.assets.map(song => {
            return {
                id: song.id,
                duration: song.duration,
                url: song.uri,
                title: song.filename,
                album: 'My Album',
                artist: 'Vitor Prata',
            }
        })

        await TrackPlayer.add(musicsInfo);

        return true;

    } catch (error) {
        console.log(error)
    }
};

const _getMusics = async () => {
    const initStatus = {
        first: 1500,
        mediaType: MediaLibrary.MediaType.audio
    }

    const media = await MediaLibrary.getAssetsAsync(initStatus);

    return media;
}


export const useMusic = () => {

    const [state, dispatch] = useReducer(reducer, initState);
    const [index, setIndex] = useState(0);

    const rewind = () => {
        setIndex((curState) => curState + 1);
    }

    const fastfoward = () => {
        setIndex((curState) => curState - 1);
    }

    useEffect(() => {
        const initTrack = async () => {
            const init = await trackPlayerInit();

            dispatch({
                type: SET_INIT,
                payload: { isTrackInit: init }
            });
        }

        initTrack();
    }, []);

    useEffect(() => {
        if(state.isPlaying) 
            TrackPlayer.play();
        else
            TrackPlayer.pause();
    }, [state.isPlaying]);
    

    const HandlePlaySong = useCallback(
        () => {
            dispatch({
                type: UPDATE_PLAYING,
                payload: { isPlaying: !state.isPlaying }
            });
        },
        [dispatch, state],
    );

    return { state, index, rewind, fastfoward, HandlePlaySong };
}