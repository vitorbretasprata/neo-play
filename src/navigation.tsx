import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PlayerContextProvider } from "./context/RNPlayerTrackContext";

import { createStackNavigator } from "@react-navigation/stack";
import TrackPlayer from 'react-native-track-player';

import BottomTabs from "./components/BottomNavigator";

const trackPlayerInit = async () => {
    try {
        await TrackPlayer.setupPlayer();

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
            <BottomTabs />
          </NavigationContainer>
        )}        
      </PlayerContextProvider>
    );
}
