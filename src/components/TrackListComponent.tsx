import React, {useCallback, memo, useState, useEffect} from 'react';
import {Track} from 'react-native-track-player';
import {FlatList} from 'react-native-gesture-handler';

import MusicComponent from './MusicComponent';
import {initMusicStorage} from '../helpers/getMediaMusic';

import {View, StyleSheet} from 'react-native';

interface ITrackList {
  onSwitchTrack: (track: Track) => void;
}

interface ITrackElement {
  item: Track;
  index: number;
}

const TrackListComponent: React.FC<ITrackList> = ({onSwitchTrack}) => {
  const [songList, setSongList] = useState<Array<Track>>([]);

  useEffect(() => {
    initStorage();
  }, []);

  const initStorage = async () => {
    const musics = await initMusicStorage();
    if (musics) {
      setSongList(musics);
    }
  };

  const switchTrack = (track: Track) => onSwitchTrack(track);

  const renderMusic = ({index, item}: ITrackElement) => (
    <MusicComponent index={index} item={item} onTouch={switchTrack} />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const renderEmpty = () => {
    return <View />;
  };

  return (
    <FlatList
      data={songList}
      style={styles.list}
      renderItem={renderMusic}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      invertStickyHeaders={true}
    />
  );
};

export default memo(TrackListComponent);

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 28,
    maxHeight: "80%"
  },
  separator: {
    height: 1,
    width: '100%',
    marginHorizontal: "auto",
    backgroundColor: 'rgba(255, 137, 137, 0.5)',
  },
});
