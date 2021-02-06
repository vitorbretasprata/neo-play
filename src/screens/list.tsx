import React, { useState, useEffect, useCallback } from 'react';
import { Track } from "react-native-track-player";
import { FlatList } from "react-native-gesture-handler";

import TrackPlayer from "react-native-track-player";

import MusicComponent from "../components/MusicComponent";
import HeaderListComponent from "../components/HeaderListComponent";

import * as MediaLibrary from "expo-media-library";

import { LinearGradient } from "expo-linear-gradient";
import { View } from 'react-native';
import { usePlayerContext } from '../context/RNPlayerTrackContext';

interface ITrackElement {
  item: Track,
  index: number
}

export const initMusicStorage = async () => {
  try {
      const songs : MediaLibrary.PagedInfo<MediaLibrary.Asset> = await _getMusics();

      let musicsInfo : Array<TrackPlayer.Track> = [];

      songs.assets.forEach(song => {
          let re = /.flac|.wma/g;

          const isFlacOrOgg = re.test(song.filename);

          if(!isFlacOrOgg) {
              musicsInfo.push({
                  id: song.id,
                  duration: song.duration,
                  url: song.uri,
                  title: song.filename,
                  album: song.albumId,
                  artist: 'Unknown',
              });
          } 
      });

      return musicsInfo;
  } catch (error) {
      console.log(error);
  }
};

const _getMusics = async () => {
  const initStatus = {
      first: 1500,
      mediaType: MediaLibrary.MediaType.audio
  }

  const media = await MediaLibrary.getAssetsAsync(initStatus);

  return media;
}

export default function List(props : any) {
    const [songList, setSongList] = useState<Array<Track>>([]);

    const values = usePlayerContext();

    const switchSong = (song : Track) => values.switchSong(song);

    useEffect(() => {
      initStorage();
    }, [])

    const initStorage = async () => {
      const musics = await initMusicStorage();
      if(musics) setSongList(musics);

    }

    const toggleDrawer = useCallback(() => props.navigation.toggleDrawer(), [props.navigation]);

    const renderMusic = ({ index, item } : ITrackElement) => <MusicComponent index={index} item={item} onTouch={switchSong} />;

    const renderHeader = () => <HeaderListComponent toggleNavigation={toggleDrawer}/>;

    const renderFooter = () => {
      return (
        <View> 

        </View>
      )
    };

    const renderSeparator = () =>  <View  style={{ height: 1, width: "100%", backgroundColor: "#707070" }}/>;


    const renderEmpty = () => {
      return (
        <View> 

        </View>
      )
    };

    return (
      <LinearGradient
        colors={["#626262", "#737373"]}
        start={[0.1, 0.2]}
        style={{ flex: 1 }}
      >

        <FlatList 
          data={songList}
          renderItem={renderMusic}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmpty}
          invertStickyHeaders={true}
        />
      </LinearGradient>
    );
}