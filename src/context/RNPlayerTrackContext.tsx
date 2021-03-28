import React, { PropsWithChildren, useState, useCallback, useReducer, Reducer } from "react";
import TrackPlayer, { State as TrackState, STATE_PAUSED, STATE_PLAYING, STATE_STOPPED, Track } from "react-native-track-player";

import { useTrackPlayerEvents, useTrackPlayerProgress } from 'react-native-track-player/lib/index';

interface PlayerTrackContext {
    isPlaying: boolean,
    isPaused: boolean,
    isStopped: boolean,
    isEmpty: boolean,
    currentTrack: Track | null,
    position: number,
    duration: number,
    play: (track? : Track) => void,
    switchSong: (track : Track) => void,
    pause: () => void,
    seekTo: () => void,
    goTo: (value : number) => void,
    next: () => void,
    previous: () => void
}

interface ProgressComponentState {
    position: number,
    bufferedPosition: number,
    duration: number
}

interface ProgressComponent {
    getProgress: () => number,
    getBufferedProgress: () => number
}

export const PlayerTrackContext = React.createContext<PlayerTrackContext>({
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isEmpty: true,
    currentTrack: null,
    position: 0,
    duration: 0,
    play: (track) => null,
    switchSong: (track : Track) => null,
    seekTo: () => null,
    goTo: (value : number) => null,
    pause: () => null,
    next: () => null,
    previous: () => null
});

const reducer : Reducer<TrackState | null, TrackState> = (state, value) => {
    return value;
} 

export const PlayerContextProvider: React.FC = (props : PropsWithChildren<any>) => {

    const [state, dispatch] = useReducer(reducer, null);

    const { position, duration } = useTrackPlayerProgress();

    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);

    useTrackPlayerEvents(['playback-state', 'playback-track-changed'], 
        (event: any) => {
            dispatch(event.state);
        }
    );

    useTrackPlayerEvents(['playback-track-changed'], 
        (event: any) => {
            changeTrackInfo(event.nextTrack)
        }
    );

    const changeTrackInfo = async (trackId : string) => {
        const trackPlaying = await TrackPlayer.getTrack(trackId);

        if(trackPlaying) setCurrentTrack(trackPlaying);

        if(state !== STATE_PLAYING) await TrackPlayer.play();     
    }

    const play = async () =>  {
        await TrackPlayer.play();
    }
    
    const switchSong = async (song : Track) => {
        await TrackPlayer.skip(song.id);
    }

    const pause = async () => {
        await TrackPlayer.pause();
    }

    const next = async () => {
        await TrackPlayer.skipToNext();
    }

    const previous = async () => {
        await TrackPlayer.skipToPrevious();
    }

    const seekTo = () => {

    }

    const goTo = async (value : number) => {
        await TrackPlayer.seekTo(value);
    }
    
    const value : PlayerTrackContext = {
        isPlaying : state === STATE_PLAYING,
        isPaused : state === STATE_PAUSED,
        isStopped : state === STATE_STOPPED,
        isEmpty : state === null,
        position,
        duration,
        currentTrack,
        switchSong,
        pause,
        play,
        seekTo,
        goTo,
        next,
        previous
    }
    
    return <PlayerTrackContext.Provider value={value}>{props.children}</PlayerTrackContext.Provider>;
}

export const usePlayerContext = () => React.useContext(PlayerTrackContext);