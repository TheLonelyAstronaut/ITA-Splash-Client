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

    RNTrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        const position = await RNTrackPlayer.getPosition();

        if (position > 3) {
            await RNTrackPlayer.seekTo(0);
        } else {
            await RNTrackPlayer.skipToPrevious();
        }
    });

    RNTrackPlayer.addEventListener(Event.RemoteStop, () => {
        RNTrackPlayer.destroy();
    });
};
