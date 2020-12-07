import { useState, useReducer, useCallback, DispatchWithoutAction, useEffect } from "react";
import constants from "../constants/index";

interface IMusicTrack {
    shouldPlay: boolean,
    rate: number,
    shouldCorrectPitch: boolean,
    volume: number,
    isMuted: boolean,
    isPlaying: boolean
}

interface IAction {
    type: string,
    payload : any
}

interface IReducer {
    reducer: IMusicTrack,
    dispatch: DispatchWithoutAction
}

const initState = {
    shouldPlay: false,
    rate: 1.0,
    shouldCorrectPitch: true,
    volume: 1.0,
    isMuted: false,
    isPlaying: false
}

const { UPDATE_PLAYING, UPDATE_BUFFERING } = constants;

const reducer = (state : IMusicTrack, action : IAction) => {

    switch(action.type) {
        case UPDATE_PLAYING: 
            return {
                ...state,
                isPlaying: action.payload.isPlaying
            }

        case UPDATE_BUFFERING: 
            return {
                ...state,
                isBuffering: action.payload.isBuffering
            }
        default: 
            return state;
    }   
}


export const useMusic = () => {

    const [state, dispatch] = useReducer(reducer, initState);
    const [index, setIndex] = useState(0);

    const rewind = () => {
        setIndex((curState) => curState + 1);
    }

    const fastfoward = () => {
        setIndex((curState) => curState - 1);
    }

    useEffect(() => {
        
    }, []);

    return { state, dispatch, index, rewind, fastfoward };
}