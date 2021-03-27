import React, { useEffect, useCallback } from 'react';

import HeaderHome from "../components/HeaderHome";
import ArtContainer from "../components/ArtContainer";
import Track from "../components/TrackContainer";
import Controls from "../components/ControlsContainer";
import { usePlayerContext } from "../context/RNPlayerTrackContext";

import { LinearGradient } from "expo-linear-gradient";

export default function Song(props : any) {

    const value = usePlayerContext();

    const handlePlay = () => {
      if(value.isPlaying) {
        value.pause();
      } else {
        value.play();
      }
    }

    //.next();
    //const handlePrevious = () => value.previous();

    const toggleDrawer = useCallback(() => props.navigation.toggleDrawer(), [props.navigation]);

    return (
      <LinearGradient
        colors={["#626262", "#737373"]}
        start={[0.1, 0.2]}
        style={{ flex: 1 }}
      >
        <HeaderHome toggleNavigation={toggleDrawer}/>
        <ArtContainer
          currentTrack={value.currentTrack}
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
            HandlePlay={handlePlay}
            isPlaying={value.isPlaying}
            disabled={false}
        />
      </LinearGradient>
    );
}
