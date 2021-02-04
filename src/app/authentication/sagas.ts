import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { Logger } from '../utils/logger';

import { LOGIN, REGISTER } from './actions';

export function* registerSaga(action: ReturnType<typeof REGISTER.TRIGGER>): SagaIterator {
    yield call(client.register, action.payload);
}

export function* loginSaga(action: ReturnType<typeof LOGIN.TRIGGER>): SagaIterator {
    yield put(LOGIN.STARTED(action.payload));

    try {
        const result = yield call(client.login, action.payload);
        yield put(LOGIN.COMPLETED(result));
    } catch (err) {
        const error = new Error(err);

        yield call(Logger.error, error);
        yield put(LOGIN.COMPLETED.failed(error));
    }
}

export function* listenForLoginSaga(): SagaIterator {
    yield takeLatest(LOGIN.TRIGGER, loginSaga);
}

export function* listenForRegisterSaga(): SagaIterator {
    yield takeLatest(REGISTER.TRIGGER, registerSaga);
}

// export function* listenForThemeSaga(): SagaIterator {
//     yield put(CHANGE_THEME)
// }
