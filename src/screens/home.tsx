import React, { useEffect, useCallback } from 'react';
import { View } from "react-native";

import HeaderHome from "../components/HeaderHome";
import ArtContainer from "../components/ArtContainer";
import Track from "../components/TrackContainer";
import Controls from "../components/ControlsContainer";
import { useMusic } from "../hooks/useMusic";

import constants from "../constants/index";

import { LinearGradient } from "expo-linear-gradient";

const { UPDATE_PLAYING, UPDATE_BUFFERING } = constants;

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

    const HandlePlayTrack = () => HandlePlaySong();

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
             HandlePlay={HandlePlayTrack}
             isPlaying={state.isPlaying}
             HandleFastFoward={() => {}}
             HandleRewind={() => {}}
             disabled={!state.isTrackInit}
          />
      </LinearGradient>
    );
}
