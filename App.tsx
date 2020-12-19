import React from 'react';
import Navigation from "./src/navigation";

import TrackPlayer from "react-native-track-player";

TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_JUMP_FORWARD,
    TrackPlayer.CAPABILITY_JUMP_BACKWARD,
  ],
});

export default function App() {
  return <Navigation />;
}


