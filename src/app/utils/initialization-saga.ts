import RNTrackPlayer, { Capability, Event } from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { Dispatch } from 'redux';
import { Track } from '../player/player.state';

const CAPABILITIES_ARRAY: Capability[] = [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
];

export function* initializationSaga(dispatch: Dispatch): SagaIterator {
    yield call(RNTrackPlayer.setupPlayer);
    yield call(RNTrackPlayer.updateOptions, {
        stopWithApp: true,
        capabilities: CAPABILITIES_ARRAY,
        compactCapabilities: CAPABILITIES_ARRAY,
        notificationCapabilities: CAPABILITIES_ARRAY,
    });

    yield call(RNTrackPlayer.addEventListener, Event.PlaybackTrackChanged, async () => {
        const currentTrackID = await RNTrackPlayer.getCurrentTrack();
        const currentTrack = (await RNTrackPlayer.getTrack(currentTrackID)) as Track;

        console.log(currentTrack);

        // Pass current track id to store
        // dispatch()
    });
}
