import RNTrackPlayer, { State } from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';

import { MUSIC_ACTIONS } from './actions';
import { ControlActions } from './player.state';

export function* addToQueueSaga(action: ReturnType<typeof MUSIC_ACTIONS.ADD_TO_THE_QUEUE>): SagaIterator {
    yield call(RNTrackPlayer.add, action.payload);
}

export function* playSaga(action: ReturnType<typeof MUSIC_ACTIONS.PLAY.TRIGGER>): SagaIterator {
    yield call(RNTrackPlayer.reset);
    yield call(RNTrackPlayer.add, {
        id: action.payload.id,
        title: action.payload.title,
        artist: action.payload.artist,
        url: action.payload.url,
        artwork: action.payload.artwork,
    });
    yield call(RNTrackPlayer.play);
}

export function* controlSaga(action: ReturnType<typeof MUSIC_ACTIONS.CONTROL.TRIGGER>): SagaIterator {
    switch (action.payload.action) {
        case ControlActions.PAUSE_RESUME: {
            const state = yield call(RNTrackPlayer.getState);
            if (state === State.Playing) {
                yield call(RNTrackPlayer.pause);
            } else if (state === State.Paused) {
                yield call(RNTrackPlayer.play);
            }
            break;
        }
        case ControlActions.SKIP_TO_NEXT: {
            yield call(RNTrackPlayer.skipToNext);
            break;
        }
        case ControlActions.SKIP_TO_PREVIOUS: {
            yield call(RNTrackPlayer.skipToPrevious);
            break;
        }
    }
}

export function* listenControlSaga(): SagaIterator {
    yield takeLatest(MUSIC_ACTIONS.CONTROL.TRIGGER, controlSaga);
}

export function* listenPlaySaga(): SagaIterator {
    yield takeLatest(MUSIC_ACTIONS.PLAY.TRIGGER, playSaga);
}

export function* listenAddToQueueSaga(): SagaIterator {
    yield takeLatest(MUSIC_ACTIONS.ADD_TO_THE_QUEUE, addToQueueSaga);
}
