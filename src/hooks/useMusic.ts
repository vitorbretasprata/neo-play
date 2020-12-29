import { useState, useReducer, useCallback, useEffect } from "react";
import constants from "../constants/index";

import * as MediaLibrary from "expo-media-library";
import TrackPlayer from 'react-native-track-player';

import { IAction, IEventState, IMusicTrack } from "./interfaces/index";

import { useTrackPlayerProgress, useTrackPlayerEvents } from 'react-native-track-player/lib/hooks';
import { 
    PLAYBACK_STATE, 
    REMOTE_PAUSE, 
    REMOTE_PLAY, 
    REMOTE_SEEK, 
    REMOTE_SKIP, 
    REMOTE_PREVIOUS 
} from "react-native-track-player/lib/eventTypes";

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

const Events = [
    PLAYBACK_STATE,
    REMOTE_PAUSE,
    REMOTE_PLAY,
    REMOTE_SEEK,
    REMOTE_SKIP,
    REMOTE_PREVIOUS
];

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
        });

        await TrackPlayer.add({
            id: '1',
            url:
                'https://cf-hls-media.sndcdn.com/media/3352449/3512109/o6M9UyBcRkZw.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLWhscy1tZWRpYS5zbmRjZG4uY29tL21lZGlhLyovKi9vNk05VXlCY1JrWncuMTI4Lm1wMyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwOTI2NjE5NX19fV19&Signature=Wvcl1gTB-TA1UwJ3MrWTJ3WI5003HrkIIbSdza4EJTP4mNPfctTC8HFDdwtVR~D94V6kYouhCQTsYWbjQVFNJOsFP2N6yvpRmHKL9ravTNXznvQiWJKunRSCs56QbjYNwShj-x2onRgX3cRntjs1f~w0GCfT-N01qc95Xn6v~nY66cyQS5C~EVZly2ZqZsfcu7~0CzxJc-yMkuaFkvl8~YxVOpS8-PCzByDNIig2niQsU7304lKwVIjmXRs2bRdSJlcMj1UdwhjE4qDh~5CQs84lTKg1qIaIU5aP~BZ9VVUSND4qckyCnQkdq-JlbFx90swN25vsocRYP23CcaTiNA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            type: 'default',
            title: "Make Sure It's For Sure",
            album: 'Am I Doing This Right?',
            artist: 'Chad Neidt',
            artwork: 'https://f4.bcbits.com/img/a1463017383_16.jpg',
        });

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
    const [sliderValue, setSliderValue] = useState(0);

    const { position, duration } = useTrackPlayerProgress(250);

    useEffect(() => {
        if(!state.isSeeking && position && duration) {
            setSliderValue(position / duration);
        }
    }, [position, duration]);

    useTrackPlayerEvents(Events, (event : IEventState)  => {

        if (event.type === REMOTE_PLAY)
            dispatch({
                type: UPDATE_PLAYING,
                payload: { isPlaying: true }
            });
         
        
        if(event.type === REMOTE_PAUSE)
            dispatch({
                type: UPDATE_PLAYING,
                payload: { isPlaying: false }
            });
    });    

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
            if(position > 1.5) {
                await TrackPlayer.seekTo(0);
                setSliderValue(0);
            } 
        },
        []
    );

    const fastfoward = () => useCallback(
        async () => {
            if(position > 1.5) {
                await TrackPlayer.seekTo(0);
                setSliderValue(0);
            } 
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