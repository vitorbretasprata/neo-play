import React, {useCallback, memo, useState, useEffect} from 'react';
import {Track} from 'react-native-track-player';
import {FlatList} from 'react-native-gesture-handler';

import MusicComponent from './MusicComponent';
import {initMusicStorage} from '../helpers/getMediaMusic';

import {View, StyleSheet, TextInput } from 'react-native';

interface ITrackList {
  onSwitchTrack: (track: Track) => void;
}

interface ITrackElement {
  item: Track;
  index: number;
}

const TrackListComponent: React.FC<ITrackList> = ({onSwitchTrack}) => {
  const [songList, setSongList] = useState<Array<Track>>([]);
  const [filteredList, setFilteredList] = useState<Array<Track>>([]);

  const [inputTrack, setInputTrack] = useState("");

  useEffect(() => {
    initStorage();
  }, []);

  useEffect(() => {
    if(inputTrack === "") {
      setFilteredList(songList);
    } else {
      setFilteredList(songList.filter(item => (item.title.toLowerCase().indexOf(inputTrack.toLowerCase()) > -1)));
    }
  }, [inputTrack]);

  const initStorage = async () => {
    const musics = await initMusicStorage();
    if (musics) {
      setSongList(musics);
      setFilteredList(musics);
    }
  };

  const switchTrack = (track: Track) => onSwitchTrack(track);

  const renderMusic = ({index, item}: ITrackElement) => (
    <MusicComponent index={index} item={item} onTouch={switchTrack} />
  );

  const renderSeparator = () => <View style={styles.separator} />;

    const handleChange = (e : string) => setInputTrack(e);

  const renderEmpty = () => {
    return <View />;
  };

  return (
    <>
      <View style={styles.textInputContainer}>
        <TextInput 
          style={styles.textInput}
          placeholderTextColor="#D100BC"
          placeholder="Buscar musica"
          onChangeText={handleChange}
          value={inputTrack}
        />
      </View>      
      <FlatList
        data={filteredList}
        style={styles.list}
        renderItem={renderMusic}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
        invertStickyHeaders={true}
      />
    </>
  );
};

export default memo(TrackListComponent);

const styles = StyleSheet.create({
  textInputContainer: {
    paddingHorizontal: 28,
    paddingVertical: 12
  },
  textInput:{
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 22,
    backgroundColor: "rgba(152, 0, 137, 1)"
  },
  list: {
    maxHeight: "80%",
    paddingHorizontal: 28
  },
  separator: {
    height: 1,
    width: '100%',
    marginHorizontal: "auto",
    backgroundColor: 'rgba(255, 137, 137, 0.5)',
  },
});
