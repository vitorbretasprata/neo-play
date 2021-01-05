import { useState, useReducer, useCallback, useEffect } from "react";
import constants from "../constants/index";

import * as MediaLibrary from "expo-media-library";
import TrackPlayer from 'react-native-track-player';

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

const { UPDATE_PLAYING, UPDATE_BUFFERING, SET_INIT, SET_SEEKING, SET_FIRST_TRACK, SET_CURRENT_TRACK, REMOTE_NEXT } = constants;

const Events = [
    PLAYBACK_STATE,
    REMOTE_PAUSE,
    REMOTE_PLAY,
    REMOTE_SEEK,
    REMOTE_SKIP,
    REMOTE_DUCK,
    REMOTE_PREVIOUS,
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

const trackPlayerInit = async () => {
    try {
        await TrackPlayer.setupPlayer();

        const songs : MediaLibrary.PagedInfo<MediaLibrary.Asset> = await _getMusics();

        let musicsInfo : Array<TrackPlayer.Track> = [];

        songs.assets.forEach(song => {
            let re = /.flac|.mp3|.wma/g;

            const isFlacOrOgg = re.test(song.filename);

            if(!isFlacOrOgg) {
                musicsInfo.push({
                    id: song.id,
                    duration: song.duration,
                    url: song.uri,
                    title: song.filename,
                    album: song.albumId,
                    artist: 'Unknown',
                });
            } 
        });

        await TrackPlayer.add(musicsInfo);

        TrackPlayer.updateOptions({
            stopWithApp: false,
            capabilities: [
              TrackPlayer.CAPABILITY_PLAY,
              TrackPlayer.CAPABILITY_PAUSE,
              TrackPlayer.CAPABILITY_SKIP,
              TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
              TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            ]
        });

        return musicsInfo[0].id;

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
    const [sliderValue, setSliderValue] = useState(0);

    const { position, duration } = useTrackPlayerProgress(250);

    useEffect(() => {
        if(!state.isSeeking && position && duration) {
            console.log(position)
            setSliderValue(position / duration);
        }
    }, [position, duration]);

    useTrackPlayerEvents(Events, (event : IEventState)  => {
        console.log(event.type)
        if (event.type === REMOTE_PLAY)
            dispatch({
                type: UPDATE_PLAYING,
                payload: { isPlaying: true }
            });

        if(event.type === REMOTE_PAUSE || event.type === REMOTE_DUCK)
            dispatch({
                type: UPDATE_PLAYING,
                payload: { isPlaying: false }
            });

        if(event.type === REMOTE_PREVIOUS || event.type === REMOTE_NEXT)
            setCurrentTrack();
    });

    useEffect(() => {
        const initTrack = async () => {
            const firstTrack = await trackPlayerInit();

            if(firstTrack) {
                setCurrentTrack();

                dispatch({
                    type: SET_INIT,
                    payload: { isTrackInit: true }
                });

                dispatch({
                    type: SET_FIRST_TRACK,
                    payload: { firstTrackId: firstTrack }
                });
            }
        }

        initTrack();
    }, []);

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

    const rewind = useCallback(
        async () => {   
            const currentTrack = await TrackPlayer.getCurrentTrack();
            if(state.firstTrackId === currentTrack || position > 1.5) {
                await TrackPlayer.seekTo(0);
            } else {
                await TrackPlayer.skipToPrevious();
            }
            setSliderValue(0);
            setCurrentTrack();
        },
        [state.firstTrackId]
    );

    const setCurrentTrack = async () => {
        const currentId = await TrackPlayer.getCurrentTrack();

        const currentTrack = await TrackPlayer.getTrack(currentId);

        dispatch({
            type: SET_CURRENT_TRACK,
            payload: { currentTrack: currentTrack }
        });
    }

    const fastfoward = useCallback(
        async () => {
            await TrackPlayer.skipToNext();

            setSliderValue(0);
            setCurrentTrack();
        },
        []
    );

    return { 
        state, 
        rewind, 
        fastfoward, 
        HandlePlaySong, 
        slidingStarted, 
        slidingCompleted, 
        sliderValue, 
        duration, 
        position
    };
}