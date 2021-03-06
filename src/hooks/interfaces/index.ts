import { EventType } from 'react-native-track-player';

export interface IMusicTrack {
    shouldPlay: boolean,
    isTrackInit: boolean,
    rate: number,
    shouldCorrectPitch: boolean,
    volume: number,
    isMuted: boolean,
    isPlaying: boolean,
    isSeeking: boolean,
    firstTrackId: number,
    currentTrack: object
}

export interface IAction {
    type: string,
    payload : any
}

export interface IEventState {
    state: number,
    type: EventType
}