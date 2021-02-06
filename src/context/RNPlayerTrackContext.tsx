import React, { PropsWithChildren, useState, useEffect } from "react";
import TrackPlayer, { State as TrackState, STATE_NONE, STATE_PAUSED, STATE_PLAYING, STATE_STOPPED, Track } from "react-native-track-player";

interface PlayerTrackContext {
    isPlaying: boolean,
    isPaused: boolean,
    isStopped: boolean,
    isEmpty: boolean,
    currentTrack: Track | null,
    play: (track? : Track) => void,
    pause: () => void;
}

export const PlayerTrackContext = React.createContext<PlayerTrackContext>({
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isEmpty: false,
    currentTrack: null,
    play: () => null,
    pause: () => null
});

export const PlayerContextProvider: React.FC = (props : PropsWithChildren<any>) => {

    const [playerState, setPlayerState] = useState<null | TrackState>(null);
    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);

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


    const pause = async () => {
        await TrackPlayer.pause();
    }

    const value : PlayerTrackContext = {
        isPlaying : playerState === STATE_PLAYING,
        isPaused : playerState === STATE_PAUSED,
        isStopped : playerState === STATE_STOPPED,
        isEmpty : playerState === null,
        currentTrack,
        pause,
        play
    }
    
    return <PlayerTrackContext.Provider value={value}>{props.children}</PlayerTrackContext.Provider>;
}

export const usePlayerContext = () => React.useContext(PlayerTrackContext);