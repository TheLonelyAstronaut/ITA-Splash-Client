import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { Logger } from '../utils/logger';

import { ADD_PLAYLIST, ADD_TO_LIKED, LOAD_LIBRARY, REMOVE_FROM_LIKED } from './actions';

export function* loadLibrarySaga(action: ReturnType<typeof LOAD_LIBRARY.TRIGGER>): SagaIterator {
    try {
        yield put(LOAD_LIBRARY.STARTED());
        const result = yield call(client.getLibrary, action.payload);
        yield put(LOAD_LIBRARY.COMPLETED(result));
    } catch (error) {
        yield call(Logger.error, error);
        yield put(LOAD_LIBRARY.COMPLETED.failed(error));
    }
}

export function* addPlaylistSaga(action: ReturnType<typeof ADD_PLAYLIST.TRIGGER>): SagaIterator {
    try {
        yield put(LOAD_LIBRARY.STARTED());
        const result = yield call(client.addPlaylist, action.payload);
        yield put(LOAD_LIBRARY.COMPLETED(result));
    } catch (error) {
        yield call(Logger.error, error);
        yield put(LOAD_LIBRARY.COMPLETED.failed(error));
    }
}

export function* addToLiked(action: ReturnType<typeof ADD_TO_LIKED.TRIGGER>): SagaIterator {
    try {
        yield call(client.addToLiked, action.payload.data);
    } catch (e) {
        yield call(Logger.error, e);
        yield put(LOAD_LIBRARY.COMPLETED.failed(e));
    }
}

export function* removeFromLiked(action: ReturnType<typeof REMOVE_FROM_LIKED.TRIGGER>): SagaIterator {
    try {
        yield call(client.removeFromLiked, action.payload.data);
    } catch (e) {
        yield call(Logger.error, e);
        yield put(LOAD_LIBRARY.COMPLETED.failed(e));
    }
}

export function* listenForRemoveFromLikedSaga(): SagaIterator {
    yield takeLatest(REMOVE_FROM_LIKED.TRIGGER, removeFromLiked);
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
