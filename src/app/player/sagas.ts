import RNTrackPlayer from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { takeLatest, call } from 'redux-saga/effects';

import { MUSIC_CONTROL } from './actions';

export function* playSaga(action: ReturnType<typeof MUSIC_CONTROL.PLAY>): SagaIterator {
    yield call(RNTrackPlayer.setupPlayer);

    // Add a track to the queue
    yield call(RNTrackPlayer.add, {
        id: '1',
        url: require('../assets/track2.mp3'),
        title: 'Sunflower',
        artist: 'Post Malone',
        artwork: require('../assets/light-logo.jpg'),
    });

    // Start playing it
    yield call(RNTrackPlayer.play);
}

export function* listenPlaySaga(): SagaIterator {
    yield takeLatest(MUSIC_CONTROL.PLAY, playSaga);
}

export function* pauseSaga(): SagaIterator {
    yield call(RNTrackPlayer.pause);
}

export function* listenPauseSaga(): SagaIterator {
    yield takeLatest(MUSIC_CONTROL.PAUSE, pauseSaga);
}

export function* listenNextSaga(): SagaIterator {
    yield takeLatest(MUSIC_CONTROL.NEXT, RNTrackPlayer.skipToNext);
}

export function* listenPrevSaga(): SagaIterator {
    yield takeLatest(MUSIC_CONTROL.PREV, RNTrackPlayer.skipToPrevious);
}
