import RNTrackPlayer, { Capability } from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

const CAPABILITIES_ARRAY: Capability[] = [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
];

export function* initializationSaga(): SagaIterator {
    yield call(RNTrackPlayer.setupPlayer);
    yield call(RNTrackPlayer.updateOptions, {
        stopWithApp: true,
        capabilities: CAPABILITIES_ARRAY,
        compactCapabilities: CAPABILITIES_ARRAY,
        notificationCapabilities: CAPABILITIES_ARRAY,
    });
}
