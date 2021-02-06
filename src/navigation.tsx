import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PlayerContextProvider } from "./context/RNPlayerTrackContext";

import { initMusicStorage } from "./helpers/getMediaMusic";
import TrackPlayer from 'react-native-track-player';

import Drawer from "./components/Drawer";

const trackPlayerInit = async () => {
    try {
        await TrackPlayer.setupPlayer();

        const songs = await initMusicStorage();

        if(songs) {
            await TrackPlayer.add(songs);

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

            return songs[0].id;

        }

    } catch (error) {
        console.log(error)
    }
};

export default function Navigation() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const initTrack = async () => {
            const firstTrack = await trackPlayerInit();

            if(firstTrack) {
                setCurrentTrack();
                
                setReady(true);             
            }
        }

        initTrack();
    }, []);

    const setCurrentTrack = async () => {
        const currentId = await TrackPlayer.getCurrentTrack();
        const currentTrack = await TrackPlayer.getTrack(currentId);      
    }

    return (
      <PlayerContextProvider>
        {ready && (
          <NavigationContainer>
            <Drawer />
          </NavigationContainer>
        )}        
      </PlayerContextProvider>
    );
}
