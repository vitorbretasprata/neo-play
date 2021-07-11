import React, {useEffect, useCallback} from 'react';

import HeaderHome from '../components/HeaderHome';
import ArtContainer from '../components/ArtContainer';
import Track from '../components/TrackContainer';
import Controls from '../components/ControlsContainer';
import {usePlayerContext} from '../context/RNPlayerTrackContext';

import {LinearGradient} from 'expo-linear-gradient';

export default function Song(props: any) {
  const value = usePlayerContext();

  const handlePlay = useCallback(() => {
    value.play();
  }, []);

  const handlePause = useCallback(() => {
    console.log('fdsjfb');
    value.pause();
  }, []);

  const handleNext = useCallback(() => {
    value.next();
  }, []);

  const handlePrevious = useCallback(() => {
    value.previous();
  }, []);

  const backAction = useCallback(() => {
    props.navigation.goBack();
  }, []);

  return (
    <LinearGradient
      colors={['#6D0BBA', '#450029']}
      start={[0.1, 0.2]}
      style={{flex: 1}}>
      <HeaderHome handleNavigation={backAction} />
      <ArtContainer currentTrack={value.currentTrack} />
      <Track
        slidingStarted={value.seekTo}
        slidingCompleted={value.goTo}
        sliderValue={value.position}
        songTime={value.duration}
      />
      <Controls
        HandlePause={handlePause}
        HandleBackward={handlePrevious}
        HandleFastfoward={handleNext}
        HandlePlay={handlePlay}
        isPlaying={value.isPlaying}
        disabled={false}
      />
    </LinearGradient>
  );
}
