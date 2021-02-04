import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';

import { SEARCH } from './actions';

export function* searchSaga(action: ReturnType<typeof SEARCH>): SagaIterator {
    yield call(client.search, action.payload);
}

export function* listenForSearchSaga(): SagaIterator {
    yield takeLatest(SEARCH, searchSaga);
}
