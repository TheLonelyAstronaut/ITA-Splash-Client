import RNTrackPlayer, { Event } from 'react-native-track-player';

// eslint-disable-next-line no-undef
module.exports = async function () {
    RNTrackPlayer.addEventListener(Event.RemotePlay, () => {
        RNTrackPlayer.play();
    });

    RNTrackPlayer.addEventListener(Event.RemotePause, () => {
        RNTrackPlayer.pause();
    });

    RNTrackPlayer.addEventListener(Event.RemoteNext, () => {
        RNTrackPlayer.skipToNext();
    });

    RNTrackPlayer.addEventListener(Event.RemotePrevious, () => {
        RNTrackPlayer.skipToPrevious();
    });

    RNTrackPlayer.addEventListener(Event.RemoteStop, () => {
        RNTrackPlayer.destroy();
    });
};
