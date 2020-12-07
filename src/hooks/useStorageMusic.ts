import { useReducer, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import Constants from "../constants/index";

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
        _getMusics();
    }, []);

    const _getMusics = async () => {        
        if(storageState.musicList.length === 0) {
            const initStatus = {
                first: 1500,
                mediaType: MediaLibrary.MediaType.audio
            }

            console.log(storageState)
    
            const media = await MediaLibrary.getAssetsAsync(initStatus);
            console.log(media)

            storageDispatch({
                type: FETCH_MUSICS,
                payload: { 
                    musicList: media.assets,
                    endCursor: media.endCursor,
                    totalCount: media.totalCount,
                    hasNextPage: media.hasNextPage,  
                }
            });
        }        
    }   

    return { storageState, storageDispatch };
}