import * as MediaLibrary from "expo-media-library";
import { Track } from 'react-native-track-player';

export const initMusicStorage = async () => {
    try {
        const songs : MediaLibrary.PagedInfo<MediaLibrary.Asset> = await _getMusics();

        let musicsInfo : Array<Track> = [];

        songs.assets.forEach(song => {
            let re = /.flac|.wma/g;

            const isFlacOrOgg = re.test(song.filename);

            if(!isFlacOrOgg) {
                musicsInfo.push({
                    id: song.id,
                    duration: song.duration,
                    url: song.uri,
                    title: song.filename.split(".")[0],
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