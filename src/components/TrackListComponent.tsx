import React, { useCallback, memo } from 'react';
import { Track } from "react-native-track-player";
import { FlatList } from "react-native-gesture-handler";

import MusicComponent from "./MusicComponent";
import HeaderListComponent from "./HeaderListComponent";

import { View, StyleSheet } from 'react-native';

interface ITrackList {
  TrackList: Array<Track>,
  onSwitchTrack: ( track: Track) => void
}

interface ITrackElement {
    item: Track,
    index: number
}  

const TrackListComponent : React.FC<ITrackList> = ({ TrackList, onSwitchTrack }) => {

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
          data={TrackList}
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