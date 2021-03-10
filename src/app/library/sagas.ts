import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { Logger } from '../utils/logger';

import { ADD_PLAYLIST, ADD_TO_LIKED, LOAD_LIBRARY } from './actions';

export function* loadLibrarySaga(): SagaIterator {
    try {
        yield put(LOAD_LIBRARY.STARTED());
        const result = yield call(client.getLibrary);
        yield put(LOAD_LIBRARY.COMPLETED(result));
    } catch (err) {
        const error = new Error(err);

        yield call(Logger.error, error);
        yield put(LOAD_LIBRARY.COMPLETED.failed(error));
    }
}

export function* addPlaylistSaga(action: ReturnType<typeof ADD_PLAYLIST.TRIGGER>): SagaIterator {
    try {
        yield put(LOAD_LIBRARY.STARTED());
        const result = yield call(client.addPlaylist, action.payload);
        yield put(LOAD_LIBRARY.COMPLETED(result));
    } catch (err) {
        const error = new Error(err);

        yield call(Logger.error, error);
        yield put(LOAD_LIBRARY.COMPLETED.failed(error));
    }
}

export function* addToLiked(action: ReturnType<typeof ADD_TO_LIKED.TRIGGER>): SagaIterator {
    try {
        yield call(client.addToLiked, action.payload.id);
    } catch (e) {
        const error = new Error(e);

        yield call(Logger.error, error);
        yield put(LOAD_LIBRARY.COMPLETED.failed(e));
    }
}

export function* listenForAddToLikedSaga(): SagaIterator {
    yield takeLatest(ADD_TO_LIKED.TRIGGER, addToLiked);
}

export function* listenForAddPlaylistSaga(): SagaIterator {
    yield takeLatest(ADD_PLAYLIST.TRIGGER, addPlaylistSaga);
}

export function* listenForLoadLibrarySaga(): SagaIterator {
    yield takeLatest(LOAD_LIBRARY.TRIGGER, loadLibrarySaga);
}
