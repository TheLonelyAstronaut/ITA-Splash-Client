import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { Logger } from '../utils/logger';

import { ADD_PLAYLIST, LOAD_LIBRARY } from './actions';

export function* addPlaylistSaga(action: ReturnType<typeof ADD_PLAYLIST.TRIGGER>): SagaIterator {
    try {
        const result = yield call(client.addPlaylist, action.payload);
        yield put(ADD_PLAYLIST.COMPLETED(result));
    } catch (error) {
        yield call(Logger.error, error);
        yield put(LOAD_LIBRARY.COMPLETED.failed(error));
    }
}

export function* listenForAddPlaylistSaga(): SagaIterator {
    yield takeLatest(ADD_PLAYLIST.TRIGGER, addPlaylistSaga);
}
