import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { Logger } from '../utils/logger';

import { SEARCH_ALL } from './actions';

export function* searchSaga(action: ReturnType<typeof SEARCH_ALL.TRIGGER>): SagaIterator {
    try {
        yield put(SEARCH_ALL.STARTED());
        const result = yield call(client.search, action.payload);
        yield put(SEARCH_ALL.COMPLETED({ text: action.payload, result: result }));
    } catch (err) {
        const error = new Error(err);

        yield call(Logger.error, error);
        yield put(SEARCH_ALL.COMPLETED({ text: action.payload, result: [] }));
    }
}

export function* listenForSearchSaga(): SagaIterator {
    yield takeLatest(SEARCH_ALL.TRIGGER, searchSaga);
}
