import React, { useEffect, useCallback } from 'react';
import { View } from "react-native";

import HeaderHome from "../components/HeaderHome";
import ArtContainer from "../components/ArtContainer";
import Track from "../components/TrackContainer";
import Controls from "../components/ControlsContainer";
import { useMusic } from "../hooks/useMusic";

import constants from "../constants/index";

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
      <View
        style={{ flex: 1, backgroundColor: "#707070" }}
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
      </View>
    );
}
