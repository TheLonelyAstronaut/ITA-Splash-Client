import RNTrackPlayer from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';

import { MUSIC_CONTROL } from './actions';

export function* playSaga(action: ReturnType<typeof MUSIC_CONTROL.PLAY>): SagaIterator {
    yield call(RNTrackPlayer.setupPlayer);

    if (action.payload.isPlaying === 'idle') {
        yield call(RNTrackPlayer.add, {
            id: '1',
            url: require('../assets/track.mp3'),
            title: 'Sunflower',
            artist: 'Post Malone',
            artwork: require('../assets/light-logo.jpg'),
        });
        yield call(RNTrackPlayer.play);
    } else if (action.payload.isPlaying === 'playing') {
        yield call(RNTrackPlayer.pause);
    } else if (action.payload.isPlaying === 'paused') {
        yield call(RNTrackPlayer.play);
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
