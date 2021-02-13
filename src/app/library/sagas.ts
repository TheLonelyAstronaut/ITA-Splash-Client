import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';

import { LOAD_LIBRARY } from './actions';

export function* loadLibrarySaga(action: ReturnType<typeof LOAD_LIBRARY.TRIGGER>): SagaIterator {
    try {
        const result = yield call(client.getLibrary, action.payload);
        yield put(LOAD_LIBRARY.COMPLETED(result));
    } catch (e) {
        console.log(e);
    }
}

export function* listenForLoadLibrarySaga(): SagaIterator {
    yield takeLatest(LOAD_LIBRARY.TRIGGER, loadLibrarySaga);
}
