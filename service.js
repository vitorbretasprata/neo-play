import TrackPlayer from 'react-native-track-player';
 
module.exports = async function() {

    TrackPlayer.addEventListener('remote-play', (event) => {
        console.log(event)
        TrackPlayer.play();
    });
    
    TrackPlayer.addEventListener('remote-pause', (event) => {
        console.log(event)
        TrackPlayer.pause();
    });
    
    TrackPlayer.addEventListener('remote-next', () => {
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener('remote-duck', () => {
        TrackPlayer.pause();
    });
    
    TrackPlayer.addEventListener('remote-previous', async () => {
        const position = await TrackPlayer.getPosition();

        if(position > 1.5) {
            TrackPlayer.seekTo(0);
        } else {
            TrackPlayer.skipToPrevious();
        }
    });
};