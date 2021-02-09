import React, { PropsWithChildren, useState, useCallback, useReducer, Reducer } from "react";
import TrackPlayer, { State as TrackState, STATE_NONE, STATE_PAUSED, STATE_PLAYING, STATE_STOPPED, Track } from "react-native-track-player";

import { useTrackPlayerEvents } from 'react-native-track-player/lib/index';


interface PlayerTrackContext {
    isPlaying: boolean,
    isPaused: boolean,
    isStopped: boolean,
    isEmpty: boolean,
    currentTrack: Track | null,
    play: (track? : Track) => void,
    switchSong: (track : Track) => void,
    pause: () => void;
}

export const PlayerTrackContext = React.createContext<PlayerTrackContext>({
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isEmpty: true,
    currentTrack: null,
    play: (track) => null,
    switchSong: (track : Track) => null,
    pause: () => null
});

const reducer : Reducer<TrackState | null, TrackState> = (state, value) => {
    return value;
} 

export const PlayerContextProvider: React.FC = (props : PropsWithChildren<any>) => {

    const [state, dispatch] = useReducer(reducer, null);

    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);

    useTrackPlayerEvents(['playback-state'], 
        (event: any) => {
            dispatch(event.state);
        }
    );

    const play = useCallback(
        async (track? : Track) =>  {
            await TrackPlayer.play();
        }, 
        []
    );

    const switchSong = useCallback(
        async (song : Track) => {
            if(!currentTrack) {
                setCurrentTrack(song);
                await TrackPlayer.add(song);
                await TrackPlayer.play();                        

                return;                        
            }

            await TrackPlayer.add(song);
            await TrackPlayer.stop();
            setCurrentTrack(song);
            await TrackPlayer.skip(song.id);
            await TrackPlayer.play();   
        }, 
        []
    ); 

    const pause = useCallback(
        async () => {
            await TrackPlayer.pause();
        }, 
        []
    );
    
    const value : PlayerTrackContext = {
        isPlaying : state === STATE_PLAYING,
        isPaused : state === STATE_PAUSED,
        isStopped : state === STATE_STOPPED,
        isEmpty : state === null,
        currentTrack,
        switchSong,
        pause,
        play
    }
    
    return <PlayerTrackContext.Provider value={value}>{props.children}</PlayerTrackContext.Provider>;
}

export const usePlayerContext = () => React.useContext(PlayerTrackContext);

/**
 * const previous = useCallback(
        async () => {
            if(position > 1.5) {
                await TrackPlayer.seekTo(0);
            } else {
                await TrackPlayer.skipToPrevious();
            }
            setSliderValue(0);
        },
        []
    );

    const switchSong = useCallback(
        async (song : Track) => {
            if(!currentTrack) {
                TrackPlayer.skip(song.id)
                    .then(async () => {
                        await TrackPlayer.play();
                    }).finally(() => {
                        setCurrentTrack(song);
                    });          

                return;                        
            }

            TrackPlayer.stop()
                .then(async () => {
                    const currentSong = await TrackPlayer.getCurrentTrack();
                    if(currentSong == song.id) {
                        await TrackPlayer.seekTo(0);
                    } else {
                        setCurrentTrack(song);
                        await TrackPlayer.skip(song.id);
                    }
                }).finally(() => {
                    TrackPlayer.play();
            });
        }, 
        []
    );        

    const next = async () => await TrackPlayer.skipToNext();


    if (!track) {
        if (currentTrack) {
        await TrackPlayer.play();
        }
        return;
    }

    await TrackPlayer.add(track);
    await TrackPlayer.play();

 * 
 */