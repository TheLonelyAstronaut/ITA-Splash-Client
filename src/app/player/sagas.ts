import RNTrackPlayer, { State, Track as RNTrack } from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';

import { MUSIC_ACTIONS } from './actions';
import { ControlActions, Track } from './player.state';
import { getWasTriggeredByUser } from './selectors';

export function* addToQueueSaga(action: ReturnType<typeof MUSIC_ACTIONS.ADD_TO_THE_QUEUE.TRIGGER>): SagaIterator {
    const currentQueue = (yield call(RNTrackPlayer.getQueue)) as RNTrack[];
    const currentTrack = yield call(RNTrackPlayer.getCurrentTrack);

    const nextTrackIndex = currentQueue.findIndex((track) => track.id === currentTrack) + 1;
    const nextTrackID: string | undefined = currentQueue[nextTrackIndex]?.id;
    const subIndex: number = currentQueue.filter((track) => track.id.split('_')[0] === action.payload.id).length;

    const modifiedTrack: Track = { ...action.payload, id: `${action.payload.id}_${subIndex}` };

    yield call(RNTrackPlayer.add, modifiedTrack, nextTrackID);
    yield put(
        MUSIC_ACTIONS.ADD_TO_THE_QUEUE.COMPLETED({
            track: modifiedTrack,
            insertBeforeTrack: nextTrackID,
        })
    );
}

export function* playSaga(action: ReturnType<typeof MUSIC_ACTIONS.PLAY.TRIGGER>): SagaIterator {
    yield call(RNTrackPlayer.reset);
    yield call(RNTrackPlayer.add, [...action.payload.queue]);
    yield call(RNTrackPlayer.skip, action.payload.track.id);
    yield call(RNTrackPlayer.play);
    yield put(MUSIC_ACTIONS.PLAY.COMPLETED(action.payload));
    yield delay(1000);
    yield call(RNTrackPlayer.seekTo, 145);
}

export function* controlSaga(action: ReturnType<typeof MUSIC_ACTIONS.CONTROL.TRIGGER>): SagaIterator {
    const queue = yield call(RNTrackPlayer.getQueue);
    const currentTrack = yield call(RNTrackPlayer.getCurrentTrack);
    const position = yield call(RNTrackPlayer.getPosition);

    if (!currentTrack) {
        return;
    }

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
            const wasUserTriggered = yield select(getWasTriggeredByUser);

            if (!wasUserTriggered) {
                return;
            }

            if (currentTrack !== queue[queue.length - 1].id) {
                yield call(RNTrackPlayer.skipToNext);
            }

            break;
        }
        case ControlActions.SKIP_TO_PREVIOUS: {
            if (currentTrack !== queue[0].id) {
                if (position > 3) {
                    yield call(RNTrackPlayer.seekTo, 0);
                } else {
                    yield call(RNTrackPlayer.skipToPrevious);
                }
            }
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
    yield takeLatest(MUSIC_ACTIONS.ADD_TO_THE_QUEUE.TRIGGER, addToQueueSaga);
}
