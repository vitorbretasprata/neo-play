import * as MediaLibrary from "expo-media-library";

import TrackPlayer from 'react-native-track-player';

export const useStorageMusic = () => {

    const initMusicStorage = async () => {
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

    return { initMusicStorage };
}