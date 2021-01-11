import React, { useState, useEffect, useCallback } from 'react';
import { Track } from "react-native-track-player";
import { FlatList } from "react-native-gesture-handler";

import MusicComponent from "../components/MusicComponent";
import { initMusicStorage } from "../hooks/useMusic";
import HeaderListComponent from "../components/HeaderListComponent";

import { LinearGradient } from "expo-linear-gradient";
import { View, ListRenderItem } from 'react-native';

export default function List(props : any) {


    const [songList, setSongList] = useState<Array<Track>>([]);

    useEffect(() => {
      initStorage();
    }, [])

    const initStorage = async () => {
      const musics = await initMusicStorage();

      if(musics) setSongList(musics);

    }

    const toggleDrawer = useCallback(() => props.navigation.toggleDrawer(), [props.navigation]);


    const handleSwitchSong = (id : string) => console.log(id);

    const renderMusic = (prop : ListRenderItem<Track>) => <MusicComponent index={prop.index} item={prop.item} onTouch={handleSwitchSong} />;


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