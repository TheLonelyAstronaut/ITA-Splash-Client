import RNTrackPlayer, { Capability, Event } from 'react-native-track-player';
import { Dispatch } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

import { MUSIC_ACTIONS } from '../player/actions';
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

        dispatch(MUSIC_ACTIONS.SET_CURRENT_TRACK(currentTrack));
    });

    // Restoring queue and current song, not working now cause redux-persist cant save require() correctly,
    // it will work when we move song and images to Amazon

    /*const persistedQueue = yield select(getCurrentQueue);
    const persistedCurrentTrack = yield select(getCurrentTrack);

    if(persistedCurrentTrack && persistedQueue.length) {
        yield call(RNTrackPlayer.add, [...persistedQueue]);
        yield call(RNTrackPlayer.skip, {...persistedCurrentTrack});
    }*/
}
