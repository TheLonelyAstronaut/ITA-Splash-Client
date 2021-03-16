import { EventRegister } from 'react-native-event-listeners';
import RNTrackPlayer, { State, Track as RNTrack } from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLeading, takeLatest } from 'redux-saga/effects';

import { Track } from '../../types/music';
import { PLAYER_SKIP_TO_TRIGGERED_BY_USER } from '../utils/events';
import { firebase } from '../utils/firebase';
import { Logger } from '../utils/logger';

import { MUSIC_ACTIONS } from './actions';
import { ControlActions } from './player.types';

export function* addToQueueSaga(action: ReturnType<typeof MUSIC_ACTIONS.ADD_TO_THE_QUEUE.TRIGGER>): SagaIterator {
    const currentQueue = (yield call(RNTrackPlayer.getQueue)) as RNTrack[];
    const currentTrack = yield call(RNTrackPlayer.getCurrentTrack);
    console.log(currentTrack);

    let nextTrackIndex: number = currentQueue.findIndex((track) => track.id === currentTrack) + 1;
    if (nextTrackIndex === 0) {
        nextTrackIndex += 1;
    }
    const nextTrackID: string | undefined = currentQueue[nextTrackIndex]?.id;
    const subIndex: number = currentQueue.filter((track) => track.id.split('_')[0] === action.payload.id).length;

    const modifiedTrack: Track = { ...action.payload, id: `${action.payload.id}_${subIndex}` };
    console.log(modifiedTrack);
    if (subIndex === 0) {
        yield call(RNTrackPlayer.add, action.payload, nextTrackID);

        yield put(
            MUSIC_ACTIONS.ADD_TO_THE_QUEUE.COMPLETED({
                track: action.payload,
                insertBeforeTrack: nextTrackID,
            })
        );
    } else {
        yield call(RNTrackPlayer.add, modifiedTrack, nextTrackID);

        yield put(
            MUSIC_ACTIONS.ADD_TO_THE_QUEUE.COMPLETED({
                track: modifiedTrack,
                insertBeforeTrack: nextTrackID,
            })
        );
    }
}

export function* seekTo(action: ReturnType<typeof MUSIC_ACTIONS.SEEK_TO_POSITION>): SagaIterator {
    yield call(RNTrackPlayer.seekTo, action.payload.position);
}

export function* playSaga(action: ReturnType<typeof MUSIC_ACTIONS.PLAY.TRIGGER>): SagaIterator {
    let isQueuesEqual = true;

    if (action.payload.queue.length === action.payload.currentQueue?.length) {
        action.payload.queue.forEach((track, index) => {
            if (track.id !== action.payload.currentQueue?.[index].id) {
                isQueuesEqual = false;
            }
        });
    } else {
        isQueuesEqual = false;
    }

    if (!isQueuesEqual) {
        yield put(MUSIC_ACTIONS.PLAY.COMPLETED({ track: action.payload.track, queue: [] }));

        const trackQueueIndex = action.payload.queue.findIndex((track) => track.id === action.payload.track.id);
        const beforeQueue = action.payload.queue.slice(0, trackQueueIndex);
        const afterQueue = action.payload.queue.slice(trackQueueIndex + 1, action.payload.queue.length);

        yield call(RNTrackPlayer.reset);
        yield call(RNTrackPlayer.add, action.payload.track);

        if (afterQueue.length) {
            yield call(RNTrackPlayer.add, afterQueue);
        }

        if (beforeQueue.length) {
            yield call(RNTrackPlayer.add, beforeQueue, action.payload.track.id);
        }
    } else {
        yield call(RNTrackPlayer.skip, action.payload.track.id);
        yield call(firebase.trackStarted, action.payload.track);
    }

    yield call(RNTrackPlayer.play);
    yield call(firebase.trackStarted, action.payload.track);

    yield put(MUSIC_ACTIONS.PLAY.COMPLETED({ track: action.payload.track, queue: action.payload.queue }));
}

export function* controlSaga(action: ReturnType<typeof MUSIC_ACTIONS.CONTROL.TRIGGER>): SagaIterator {
    const queue = yield call(RNTrackPlayer.getQueue);
    const currentTrack = yield call(RNTrackPlayer.getCurrentTrack);

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
            if (currentTrack !== queue[queue.length - 1].id) {
                yield call(RNTrackPlayer.skipToNext);
                try {
                    //yield call(firebase.trackStarted, tracks[currentTrack]);
                } catch (err) {
                    const error = new Error(err);

                    yield call(Logger.error, error);
                }
            }
            break;
        }
        case ControlActions.SKIP_TO_PREVIOUS: {
            if (!action.payload.forceSkip) {
                yield call(EventRegister.emit, PLAYER_SKIP_TO_TRIGGERED_BY_USER);
                yield call(RNTrackPlayer.seekTo, 0);
            } else {
                yield call(RNTrackPlayer.skipToPrevious);
            }
            try {
                //yield call(firebase.trackStarted, tracks[currentTrack - 1]);
            } catch (err) {
                const error = new Error(err);

                yield call(Logger.error, error);
            }
            break;
        }
    }
}

export function* listenControlSaga(): SagaIterator {
    yield takeLeading(MUSIC_ACTIONS.CONTROL.TRIGGER, controlSaga);
}

export function* listenPlaySaga(): SagaIterator {
    yield takeLatest(MUSIC_ACTIONS.PLAY.TRIGGER, playSaga);
}

export function* listenAddToQueueSaga(): SagaIterator {
    yield takeLatest(MUSIC_ACTIONS.ADD_TO_THE_QUEUE.TRIGGER, addToQueueSaga);
}
export function* listenSeekTo(): SagaIterator {
    yield takeLatest(MUSIC_ACTIONS.SEEK_TO_POSITION, seekTo);
}
