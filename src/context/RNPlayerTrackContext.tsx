import React, { PropsWithChildren, useState, useCallback } from "react";
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

export const PlayerContextProvider: React.FC = (props : PropsWithChildren<any>) => {

    const [playerState, setPlayerState] = useState<null | TrackState>(null);
    const [sliderValue, setSliderValue] = useState(0);

    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);


    useTrackPlayerEvents(['playback-state'], 
        (event: any) => {
            setPlayerState(event.state);
        }
    );

    const play = useCallback(
        async (track? : Track) =>  {
            await TrackPlayer.play();
        }, 
        [PlayerTrackContext]
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
        isPlaying : playerState === STATE_PLAYING,
        isPaused : playerState === STATE_PAUSED,
        isStopped : playerState === STATE_STOPPED,
        isEmpty : playerState === null,
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