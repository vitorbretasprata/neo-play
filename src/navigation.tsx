import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PlayerContextProvider } from "./context/RNPlayerTrackContext";

import { initMusicStorage } from "./helpers/getMediaMusic";
import TrackPlayer from 'react-native-track-player';

import StackNav from "./components/StackNav";

const trackPlayerInit = async () => {
    try {
        const tracks = await initMusicStorage();
        if(tracks) {
          TrackPlayer.setupPlayer().then(async () => {
            await TrackPlayer.add(tracks);
          });
        }        

    } catch (error) {
        console.log(error)
    }
};

export default function Navigation() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const initTrack = async () => {
            await trackPlayerInit();
                  
            setReady(true);             
        }

        initTrack();
    }, []);

    return (
      <PlayerContextProvider>
        {ready && (
          <NavigationContainer>
            <StackNav /> 
          </NavigationContainer>
        )}        
      </PlayerContextProvider>
    );
}
