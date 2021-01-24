import RNTrackPlayer, { State } from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest, delay } from 'redux-saga/effects';

import { MUSIC_CONTROL } from './actions';

export function* playSaga(action: ReturnType<typeof MUSIC_CONTROL.PLAY>): SagaIterator {
    const state = yield call(RNTrackPlayer.getState);

    switch (state) {
        case State.Stopped:
        case State.Ready: {
            yield call(RNTrackPlayer.add, {
                id: '1',
                url: require('../assets/track.mp3'),
                title: 'Sunflower',
                artist: 'Post Malone',
                artwork: require('../assets/light-logo.jpg'),
            });
            yield call(RNTrackPlayer.play);
            break;
        }
        case State.Playing: {
            yield call(RNTrackPlayer.pause);
            break;
        }
        case State.Paused: {
            yield call(RNTrackPlayer.play);
            break;
        }
    }
}

export function* listenPlaySaga(): SagaIterator {
    yield takeLatest(MUSIC_CONTROL.PLAY, playSaga);
}

export function* listenNextSaga(): SagaIterator {
    yield takeLatest(MUSIC_CONTROL.NEXT, RNTrackPlayer.skipToNext);
}

export function* listenPrevSaga(): SagaIterator {
    yield takeLatest(MUSIC_CONTROL.PREV, RNTrackPlayer.skipToPrevious);
}
