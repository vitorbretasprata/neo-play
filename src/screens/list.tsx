import React, { useState, useEffect } from 'react';
import { useStorageMusic } from "../hooks/useStorageMusic";

import { Track } from "react-native-track-player";
import { FlatList } from "react-native-gesture-handler";

import MusicComponent from "../components/MusicComponent";

import { LinearGradient } from "expo-linear-gradient";
import { View } from 'react-native';

export default function List() {

    const { initMusicStorage } = useStorageMusic(); 

    const [songs, setSongs] = useState<Array<Track>>([]);

    useEffect(() => {
      initStorage();
    }, [])

    const initStorage = async () => {
      const musics = await initMusicStorage();

      if(musics) {
        setSongs(musics);
      }
    }

    const renderMusic = () => <MusicComponent />;


    const renderHeader = () => {
      return (
        <View style={{ width: "100%", height: 30, borderWidth: 1 }}> 

        </View>
      )
    };

    const renderFooter = () => {
      return (
        <View> 

        </View>
      )
    };

    const renderSeparator = () => {
      return (
        <View> 

        </View>
      )
    };

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
          data={songs}
          renderItem={renderMusic}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmpty}


        />
      </LinearGradient>
    );
}