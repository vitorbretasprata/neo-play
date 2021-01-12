import React, { useState, useEffect, useCallback } from 'react';
import { Track } from "react-native-track-player";
import { FlatList } from "react-native-gesture-handler";

import TrackPlayer from "react-native-track-player";

import MusicComponent from "../components/MusicComponent";
import { initMusicStorage } from "../hooks/useMusic";
import HeaderListComponent from "../components/HeaderListComponent";

import { LinearGradient } from "expo-linear-gradient";
import { View, ListRenderItem } from 'react-native';

interface ITrackElement {
  item: Track,
  index: number
}

export default function List(props : any) {
    const [songList, setSongList] = useState<Array<Track>>([]);

    const switchSong = (id : string) => {
      TrackPlayer.stop()
          .then(async () => {
              const currentSong = await TrackPlayer.getCurrentTrack();
              if(currentSong == id) {
                  TrackPlayer.seekTo(0);
              } else {
                  TrackPlayer.skip(id);
              }
          }).finally(() => {
              TrackPlayer.play();
          });
    }

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