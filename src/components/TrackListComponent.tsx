import React, { useCallback, memo, useState, useEffect } from 'react';
import { Track } from "react-native-track-player";
import { FlatList } from "react-native-gesture-handler";

import MusicComponent from "./MusicComponent";
import HeaderListComponent from "./HeaderListComponent";
import { initMusicStorage } from "../helpers/getMediaMusic";

import { View, StyleSheet } from 'react-native';

interface ITrackList {
  onSwitchTrack: ( track: Track) => void
}

interface ITrackElement {
    item: Track,
    index: number
}  

const TrackListComponent : React.FC<ITrackList> = ({ onSwitchTrack }) => {

    const [songList, setSongList] = useState<Array<Track>>([]);

    useEffect(() => {
      initStorage();
    }, []);

    const initStorage = async () => {
      const musics = await initMusicStorage();
      if(musics) setSongList(musics);
    } 

    const switchTrack = (track : Track) => onSwitchTrack(track);

    const renderMusic = ({ index, item } : ITrackElement) => <MusicComponent index={index} item={item} onTouch={switchTrack} />;
    const renderHeader = () => <HeaderListComponent />;

    const renderSeparator = () =>  <View style={styles.separator}/>;

    const renderEmpty = () => {
      return (
        <View> 

        </View>
      )
    };

    return (    
        <FlatList 
          data={songList}
          renderItem={renderMusic}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmpty}
          invertStickyHeaders={true}
        />
    );
}

export default memo(TrackListComponent);

const styles = StyleSheet.create({
    separator: { 
      height: 1, 
      width: "100%", 
      backgroundColor: "#707070" 
    }
});