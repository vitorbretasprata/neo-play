import { useState, useReducer, useCallback, useEffect } from "react";
import constants from "../constants/index";

import { IAction, IEventState, IMusicTrack } from "./interfaces/index";

import { useTrackPlayerProgress, useTrackPlayerEvents } from 'react-native-track-player/lib/index';
import { 
    PLAYBACK_STATE, 
    REMOTE_PAUSE, 
    REMOTE_PLAY, 
    REMOTE_SEEK, 
    REMOTE_SKIP, 
    REMOTE_PREVIOUS,
    REMOTE_DUCK
} from "react-native-track-player/lib/eventTypes";

const initState = {
    shouldPlay: false,
    isTrackInit: false,
    rate: 1.0,
    shouldCorrectPitch: true,
    volume: 1.0,
    isMuted: false,
    isPlaying: false,
    isSeeking: false,
    firstTrackId: 0,
    currentTrack: {}
}

const { 
    UPDATE_PLAYING, 
    UPDATE_BUFFERING, 
    SET_INIT, 
    SET_SEEKING, 
    SET_FIRST_TRACK, 
    SET_CURRENT_TRACK, 
    REMOTE_NEXT
} = constants;

const Events = [
    PLAYBACK_STATE,
    REMOTE_PAUSE,
    REMOTE_PLAY,
    REMOTE_SEEK,
    REMOTE_SKIP,
    REMOTE_DUCK,
    REMOTE_PREVIOUS
];

const reducer = (state : IMusicTrack, action : IAction) => {

    switch(action.type) {
        case UPDATE_PLAYING: 
            return {
                ...state,
                isPlaying: action.payload.isPlaying
            }

        case SET_CURRENT_TRACK: 
            return {
                ...state,
                currentTrack: action.payload.currentTrack
            }

        case SET_FIRST_TRACK: 
            return {
                ...state,
                firstTrackId: action.payload.firstTrackId
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

export const useMusic = () => {

    const [state, dispatch] = useReducer(reducer, initState);
    const [sliderValue, setSliderValue] = useState(0);
    
    const { position, duration } = useTrackPlayerProgress(250);

    useEffect(() => {
        if(!state.isSeeking && position && duration) {
            setSliderValue(position / duration);
        }
    }, [position, duration]);

    useTrackPlayerEvents(Events, (event : IEventState)  => {
        switch(event.type) {
            case REMOTE_PREVIOUS || REMOTE_NEXT: 
                setCurrentTrack();
            case REMOTE_PLAY: 
                dispatch({
                    type: UPDATE_PLAYING,
                    payload: { isPlaying: true }
                });
            case REMOTE_PAUSE || REMOTE_DUCK: 
                dispatch({
                    type: UPDATE_PLAYING,
                    payload: { isPlaying: false }
                });
        }
    });

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
            if(state.isPlaying) {
                TrackPlayer.pause();
                dispatch({
                    type: UPDATE_PLAYING,
                    payload: { isPlaying: false }
                });
            } else {
                TrackPlayer.play();
                dispatch({
                    type: UPDATE_PLAYING,
                    payload: { isPlaying: true }
                });
            }
        },
        [dispatch, state],
    );

    

    return { 
        state,
       
        HandlePlaySong, 
        slidingStarted, 
        slidingCompleted, 
        sliderValue, 
        duration, 
        position,
    };
}