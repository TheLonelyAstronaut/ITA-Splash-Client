import RNTrackPlayer, { Capability, Event } from 'react-native-track-player';
import { Dispatch } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createAction } from 'typesafe-redux-helpers';

import { client } from '../../graphql/api';
import { getCurrentUser } from '../../graphql/queries/get-current-user.query';
import { Track } from '../../types/music';
import { LOGIN, LOGOUT } from '../authentication/actions';
import { getAccessToken } from '../authentication/selectors';
import { MUSIC_ACTIONS } from '../player/actions';
import { closeSplashScreen } from '../ui/splash-screen.ref';

import { Logger } from './logger';

export const INITIALIZATION = createAction('[Initialization]', (payload: Dispatch) => payload);

const CAPABILITIES_ARRAY: Capability[] = [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
];

export function* initializationSaga(action: ReturnType<typeof INITIALIZATION>): SagaIterator {
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

        action.payload(MUSIC_ACTIONS.SET_CURRENT_TRACK(currentTrack));
    });
    const token = yield select(getAccessToken);
    if (token) {
        try {
            yield call(client.setAuthToken, token);
            const user = yield call(client.getCurrentUser, token);
            console.log(user);
            yield put(LOGIN.COMPLETED({ data: user }));
        } catch (err) {
            Logger.error(err);
            yield put(LOGOUT.COMPLETED());
        }
    }
    yield call(closeSplashScreen);

    // Restoring queue and current song, not working now cause redux-persist cant save require() correctly,
    // it will work when we move songs and images to Amazon

    /*const persistedQueue = yield select(getCurrentQueue);
    const persistedCurrentTrack = yield select(getCurrentTrack);

    if(persistedCurrentTrack && persistedQueue.length) {
        yield call(RNTrackPlayer.add, [...persistedQueue]);
        yield call(RNTrackPlayer.skip, {...persistedCurrentTrack});
    }*/
}

export function* listenForInitializationSaga(): SagaIterator {
    yield takeLatest(INITIALIZATION, initializationSaga);
}
