import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { Logger } from '../utils/logger';

import { LOAD_HOME_DATA } from './actions';

export function* loadHomePageSaga(action: ReturnType<typeof LOAD_HOME_DATA.TRIGGER>): SagaIterator {
    try {
        yield put(LOAD_HOME_DATA.STARTED());
        const result = yield call(client.getHomepageData, action.payload);
        yield put(LOAD_HOME_DATA.COMPLETED(result));
    } catch (err) {
        const error = new Error(err);

        yield call(Logger.error, error);
        yield put(LOAD_HOME_DATA.COMPLETED.failed(error));
    }
}

export function* listenForLoadHomepage(): SagaIterator {
    yield takeLatest(LOAD_HOME_DATA.TRIGGER, loadHomePageSaga);
}
