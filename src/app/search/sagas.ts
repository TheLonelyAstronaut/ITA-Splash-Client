import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { Logger } from '../utils/logger';

import { SEARCH_ALL } from './actions';

export function* searchSaga(action: ReturnType<typeof SEARCH_ALL.TRIGGER>): SagaIterator {
    try {
        console.log(action.payload);
        yield put(SEARCH_ALL.STARTED());
        const result = yield call(client.search, action.payload);
        console.log(result);
        yield put(SEARCH_ALL.COMPLETED({ text: action.payload, result: result }));
    } catch (error) {
        yield call(Logger.error, error);
        yield put(SEARCH_ALL.COMPLETED({ text: action.payload, result: [] }));
    }
}

export function* listenForSearchSaga(): SagaIterator {
    yield takeLatest(SEARCH_ALL.TRIGGER, searchSaga);
}
