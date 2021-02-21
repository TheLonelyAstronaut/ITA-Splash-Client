import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';

import { NOTHING_FOUNDED, SEARCH_ALL } from './actions';

export function* searchSaga(action: ReturnType<typeof SEARCH_ALL.TRIGGER>): SagaIterator {
    try {
        yield put(SEARCH_ALL.STARTED());
        const result = yield call(client.search, action.payload);
        console.log(result);
        yield put(SEARCH_ALL.COMPLETED({ text: action.payload, result: result }));
    } catch (e) {
        yield put(NOTHING_FOUNDED());
    }
}

export function* listenForSearchSaga(): SagaIterator {
    yield takeLatest(SEARCH_ALL.TRIGGER, searchSaga);
}
