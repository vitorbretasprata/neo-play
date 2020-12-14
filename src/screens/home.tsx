import React from 'react';

import HeaderHome from "../components/HeaderHome";
import ArtContainer from "../components/ArtContainer";
import Track from "../components/TrackContainer";
import Controls from "../components/ControlsContainer";
import { useMusic } from "../hooks/useMusic";
import { useStorageMusic } from "../hooks/useStorageMusic";

import constants from "../constants/index";

import { LinearGradient } from "expo-linear-gradient";

const { UPDATE_PLAYING, UPDATE_BUFFERING } = constants;

export default function Home({ navigation } : any) {

    const { state, dispatch, fastfoward, rewind, index } = useMusic();
    const { storageState } = useStorageMusic();

    console.log("---------------------------//----------------------");

    return (
      <LinearGradient
        colors={["#626262", "#737373"]}
        start={[0.1, 0.2]}
        style={{ flex: 1 }}
      >
          <HeaderHome navigation={() => navigation.navigate("List")}/>
          <ArtContainer />
          <Track />
          <Controls
             HandlePlay={() => {}}
             isPlaying={state.isPlaying}
             HandleFastFoward={() => {}}
             HandleRewind={() => {}}
          />
      </LinearGradient>
    );
}
