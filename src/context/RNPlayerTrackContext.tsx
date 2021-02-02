import React, { PropsWithChildren, useState, useEffect, useCallback } from "react";
import TrackPlayer, { State as TrackState, STATE_NONE, STATE_PAUSED, STATE_PLAYING, STATE_STOPPED, Track } from "react-native-track-player";

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


interface PlayerTrackContext {
    isPlaying: boolean,
    isPaused: boolean,
    isStopped: boolean,
    isEmpty: boolean,
    currentTrack: Track | null,
    previous: () => void,
    switchSong: (id  : string) => void,
    slidingCompleted: (value : number) => void,
    next: () => void,
    play: (track? : Track) => void,
    pause: () => void;
}

export const PlayerTrackContext = React.createContext<PlayerTrackContext>({
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isEmpty: true,
    currentTrack: null,
    previous: () => null,
    next: () => null,
    switchSong: () => null,
    slidingCompleted: () => null,
    play: () => null,
    pause: () => null
});

export const PlayerContextProvider: React.FC = (props : PropsWithChildren<any>) => {

    const [playerState, setPlayerState] = useState<null | TrackState>(null);
    const [sliderValue, setSliderValue] = useState(0);

    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);

    const { position, duration } = useTrackPlayerProgress(250);
    
    useEffect(() => {
        const listener = TrackPlayer.addEventListener(
            "playback-state", 
            ({ state } : { state: TrackState}) => {
                setPlayerState(state);
            }
        );

        return () => {
            listener.remove();
        }
    }, []);


    const play = async (track? : Track) => {
        if(track) {
            await TrackPlayer.add(track);
            setCurrentTrack(track);
        }

        await TrackPlayer.play();
    }

    const slidingCompleted = async (value : number) => {
        await TrackPlayer.seekTo(value * duration);
        setSliderValue(value);
    };


    const pause = async () => {
        await TrackPlayer.pause();
    }

    const previous = useCallback(
        async () => {
            const currentTrack = await TrackPlayer.getCurrentTrack();
            if(position > 1.5) {
                await TrackPlayer.seekTo(0);
            } else {
                await TrackPlayer.skipToPrevious();
            }
            setSliderValue(0);
            //setCurrentTrack();
        },
        []
    );

    const switchSong = (id : string) => {
        console.log(id)
        TrackPlayer.stop()
            .then(async () => {
                const currentSong = await TrackPlayer.getCurrentTrack();
                if(currentSong == id) {
                    TrackPlayer.seekTo(0);
                } else {
                    TrackPlayer.skip(id);
                }
            }).finally(() => {
                TrackPlayer.play();
        });
    }

    const next = async () => await TrackPlayer.skipToNext();

    const value : PlayerTrackContext = {
        isPlaying : playerState === STATE_PLAYING,
        isPaused : playerState === STATE_PAUSED,
        isStopped : playerState === STATE_STOPPED,
        isEmpty : playerState === null,
        currentTrack,
        previous,
        slidingCompleted,
        switchSong,
        next,
        pause,
        play
    }
    
    return <PlayerTrackContext.Provider value={value}>{props.children}</PlayerTrackContext.Provider>;
}

export const usePlayerContext = () => React.useContext(PlayerTrackContext);