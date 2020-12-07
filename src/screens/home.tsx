import React, { useEffect } from 'react';
import { View } from "react-native";

import HeaderHome from "../components/HeaderHome";
import ArtContainer from "../components/ArtContainer";
import Track from "../components/TrackContainer";
import Controls from "../components/ControlsContainer";
import { useMusic } from "../hooks/useMusic";
import { useStorageMusic } from "../hooks/useStorageMusic";

import constants from "../constants/index";


const { UPDATE_PLAYING, UPDATE_BUFFERING } = constants;

export default function Home({ navigation } : any) {

    const { state, dispatch, fastfoward, rewind, index } = useMusic();
    const { storageState } = useStorageMusic();

    console.log("---------------------------//----------------------");

    return (
      <View
        style={{ flex: 1, backgroundColor: "#707070" }}
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
      </View>
    );
}
