import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';

import { CHANGE_PASSWORD } from './actions';

export function* changePasswordSaga(action: ReturnType<typeof CHANGE_PASSWORD.TRIGGER>): SagaIterator {
    try {
        yield call(client.changePassword, action.payload.currentPass, action.payload.newPass);
    } catch (err) {
        new Error(err);
    }
}

export function* listenForChangePasswordSaga(): SagaIterator {
    yield takeLatest(CHANGE_PASSWORD.TRIGGER, changePasswordSaga);
}
