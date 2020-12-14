import React from 'react';

import HeaderHome from "../components/HeaderHome";
import ArtContainer from "../components/ArtContainer";
import Track from "../components/TrackContainer";
import Controls from "../components/ControlsContainer";
import { useMusic } from "../hooks/useMusic";

import { LinearGradient } from "expo-linear-gradient";

export default function Home() {

    const { 
      state, 
      fastfoward, 
      rewind, 
      index, 
      HandlePlaySong, 
      slidingStarted, 
      slidingCompleted, 
      sliderValue 
    } = useMusic();

    console.log("---------------------------//----------------------");

    return (
      <LinearGradient
        colors={["#626262", "#737373"]}
        start={[0.1, 0.2]}
        style={{ flex: 1 }}
      >
          <HeaderHome />
          <ArtContainer />
          <Track
            slidingStarted={slidingStarted}
            slidingCompleted={slidingCompleted}
            sliderValue={sliderValue}
          />
          <Controls
             HandlePlay={HandlePlaySong}
             isPlaying={state.isPlaying}             
             disabled={!state.isTrackInit}
          />
      </LinearGradient>
    );
}
