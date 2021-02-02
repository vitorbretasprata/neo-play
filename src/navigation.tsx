import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PlayerContextProvider } from "./context/RNPlayerTrackContext";

import { createStackNavigator } from "@react-navigation/stack";

import * as MediaLibrary from "expo-media-library";
import TrackPlayer from 'react-native-track-player';

import BottomTabs from "./components/BottomNavigator";

const NavigationOptions = {
  headerShown: false 
}

const trackPlayerInit = async () => {
    try {
        await TrackPlayer.setupPlayer();

        const songs = await initMusicStorage();

        if(songs) {
            await TrackPlayer.add(songs);

            TrackPlayer.updateOptions({
                stopWithApp: false,
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SKIP,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                ]
            });

            return songs[0].id;

        }

    } catch (error) {
        console.log(error)
    }
};

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

export default function Navigation() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const initTrack = async () => {
            const firstTrack = await trackPlayerInit();

            if(firstTrack) {
                setCurrentTrack();
                  
                setReady(true);             
            }
        }

        initTrack();
    }, []);

    const setCurrentTrack = async () => {
        const currentId = await TrackPlayer.getCurrentTrack();

        const currentTrack = await TrackPlayer.getTrack(currentId);     
    }

    return (
      <PlayerContextProvider>
        {ready && (
          <NavigationContainer>
            <BottomTabs />
          </NavigationContainer>
        )}        
      </PlayerContextProvider>
    );
}
