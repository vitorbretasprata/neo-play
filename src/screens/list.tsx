import React, { useState, useEffect, memo, useCallback } from 'react';
import { Track } from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";

import { usePlayerContext } from '../context/RNPlayerTrackContext';
import TrackListComponent from "../components/TrackListComponent";

function List() {
    const { switchSong } = usePlayerContext();

    const switchTrack = useCallback((track: Track) => switchSong(track), []);

    return (
      <LinearGradient
        colors={['#6D0BBA', '#450029']}
        start={[0.1, 0.2]}
        style={{ flex: 1 }}
      >
          <TrackListComponent 
            onSwitchTrack={switchTrack}
          />
      </LinearGradient>
    );
}

export default memo(List);