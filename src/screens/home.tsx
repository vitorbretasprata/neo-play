import React, { useEffect, useState, useCallback } from 'react';

import HeaderHome from "../components/HeaderHome";
import ArtContainer from "../components/ArtContainer";
import Track from "../components/TrackContainer";
import Controls from "../components/ControlsContainer";

import { LinearGradient } from "expo-linear-gradient";

export default function Home(props : any) {

    const [loadingScreen, setLoadingScreen] = useState(true);

    useEffect(() => {
        setLoadingScreen(false);
      
    }, []);

    const toggleDrawer = useCallback(() => props.navigation.toggleDrawer(), [props.navigation]);

    return (
      <LinearGradient
        colors={["#626262", "#737373"]}
        start={[0.1, 0.2]}
        style={{ flex: 1 }}
      >
        {!loadingScreen && (
          <>
            <HeaderHome toggleNavigation={toggleDrawer}/>
            <ArtContainer
              currentTrack={{}}
            />
            <Track
              slidingStarted={() => {}}
              slidingCompleted={() => {}}
              sliderValue={0}
              currentTime={0}
              songTime={0}
            />
            <Controls
                HandleBackward={() => {}}
                HandleFastfoward={() => {}}
                HandlePlay={() => {}}
                isPlaying={false}
                disabled={false}
            />
          </>
        )}
      </LinearGradient>
    );
}
