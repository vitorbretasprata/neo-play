import React, { useState, useEffect, memo, useCallback } from 'react';
import { Track } from "react-native-track-player";
import { LinearGradient } from "expo-linear-gradient";

import { usePlayerContext } from '../context/RNPlayerTrackContext';
import { initMusicStorage } from "../helpers/getMediaMusic";
import TrackListComponent from "../components/TrackListComponent";

function List() {
    const [songList, setSongList] = useState<Array<Track>>([]);
    const { switchSong } = usePlayerContext();

    const switchTrack = useCallback((track: Track) => switchSong(track), []);

    useEffect(() => {
      initStorage();
    }, []);

    const initStorage = async () => {
      const musics = await initMusicStorage();
      if(musics) setSongList(musics);
    }    

    return (
      <LinearGradient
        colors={["#626262", "#737373"]}
        start={[0.1, 0.2]}
        style={{ flex: 1 }}
      >
        <TrackListComponent 
          TrackList={songList}
          onSwitchTrack={switchTrack}
        />
      </LinearGradient>
    );
}

export default memo(List);
