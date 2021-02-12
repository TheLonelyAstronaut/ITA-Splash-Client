import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';

import { SEARCH_ALL } from './actions';

export function* searchSaga(action: ReturnType<typeof SEARCH_ALL.TRIGGER>): SagaIterator {
    try {
        const result = yield call(client.search, action.payload);
        yield put(SEARCH_ALL.STARTED({ text: action.payload, result: result }));
    } catch (e) {
        console.log(e);
    }
}

export function* listenForSearchSaga(): SagaIterator {
    yield takeLatest(SEARCH_ALL.TRIGGER, searchSaga);
}
