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
}
