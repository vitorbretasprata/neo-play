import React, { useEffect, useState, useCallback } from 'react';

import HeaderHome from "../components/HeaderHome";
import ArtContainer from "../components/ArtContainer";
import Track from "../components/TrackContainer";
import Controls from "../components/ControlsContainer";
import { useMusic } from "../hooks/useMusic";

import { LinearGradient } from "expo-linear-gradient";

export default function Home(props : any) {

    const [loadingScreen, setLoadingScreen] = useState(true);

    const { 
      state, 
      fastfoward, 
      rewind,  
      HandlePlaySong, 
      slidingStarted, 
      slidingCompleted, 
      sliderValue,
      duration, 
      position
    } = useMusic();

    useEffect(() => {
      if(state.currentTrack != {} && loadingScreen) {
        setLoadingScreen(false);
      }
    }, [state]);

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
              currentTrack={state.currentTrack}
            />
            <Track
              slidingStarted={slidingStarted}
              slidingCompleted={slidingCompleted}
              sliderValue={sliderValue}
              currentTime={position}
              songTime={duration}
            />
            <Controls
                HandleBackward={rewind}
                HandleFastfoward={fastfoward}
                HandlePlay={HandlePlaySong}
                isPlaying={state.isPlaying}
                disabled={!state.isTrackInit}
            />
          </>
        )}
      </LinearGradient>
    );
}
