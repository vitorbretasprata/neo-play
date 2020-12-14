import { useReducer, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import Constants from "../constants/index";

import TrackPlayer from 'react-native-track-player';

interface IMusicStarage {
    musicList: Array<Object>,
    endCursor: number,
    totalCount: number,
    hasNextPage: boolean,
}

interface IAction {
    type: string,
    payload : any
}

const initState = {
    musicList: [],
    endCursor: 0,
    totalCount: 0,
    hasNextPage: false,
}

const { FETCH_MUSICS, FETCH_MORE_MUSICS } = Constants;

const reducer = (state : IMusicStarage, action : IAction) => {

    if(action.type === FETCH_MUSICS) {
        return {
            ...action.payload
        }
    }

    if(action.type === FETCH_MORE_MUSICS) {
        return {
            ...state,
            musicList: [...state.musicList, action.payload.musicList],
            endCursor: action.payload.endCursor,
            hasNextPage: action.payload.hasNextPage
        }
    }

    return state;
}


export const useStorageMusic = () => {

    const [storageState, storageDispatch] = useReducer(reducer, initState);

    useEffect(() => {
        trackPlayerInit();
    }, []);

    const trackPlayerInit = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
          id: '1',
          url:
            'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
          type: 'default',
          title: 'My Title',
          album: 'My Album',
          artist: 'Rohan Bhatia',
          artwork: 'https://picsum.photos/100',
        });
        return true;
    };


    const _getMusics = async () => {
        if(storageState.musicList.length === 0) {
            const initStatus = {
                first: 1500,
                mediaType: MediaLibrary.MediaType.audio
            }

            const media = await MediaLibrary.getAssetsAsync(initStatus);

        }
    }

    return { storageState, storageDispatch };
}