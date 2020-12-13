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
    isPlaying: boolean,
    isSeeking: boolean
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
    isPlaying: false,
    isSeeking: false
}

const { UPDATE_PLAYING, UPDATE_BUFFERING, SET_INIT, SET_SEEKING } = constants;

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

        case SET_INIT: 
            return {
                ...state,
                isTrackInit: action.payload.isTrackInit
            }

        case SET_SEEKING: 
            return {
                ...state,
                isSeeking: action.payload.isSeeking
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

        await TrackPlayer.add({
            id: '1',
            url:
                'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
            type: 'default',
            title: 'My Title',
            album: 'My Album',
            artist: 'Rohan Bhatia',
            artwork: 'https://picsum.photos/100',
        });

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
    const [sliderValue, setSliderValue] = useState(0);

    const { position, duration } = useTrackPlayerProgress(250);


    const rewind = () => {
        setIndex((curState) => curState + 1);
    }

    const fastfoward = () => {
        setIndex((curState) => curState - 1);
    }

    useEffect(() => {
        if(state.isSeeking && position && duration) {
            setSliderValue(position / duration);
        }
    }, [position, duration]);

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
    

    const slidingStarted = () => {
        dispatch({
            type: SET_SEEKING,
            payload: { isSeeking: true }
        });
    };

    const slidingCompleted = async (value : number) => {
        await TrackPlayer.seekTo(value * duration);
        setSliderValue(value);
        dispatch({
            type: SET_SEEKING,
            payload: { isSeeking: false }
        });
    };

    const HandlePlaySong = useCallback(
        () => {
            dispatch({
                type: UPDATE_PLAYING,
                payload: { isPlaying: !state.isPlaying }
            });
        },
        [dispatch, state],
    );

    return { state, index, rewind, fastfoward, HandlePlaySong, slidingStarted, slidingCompleted, sliderValue };
}