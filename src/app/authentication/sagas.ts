import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, select, all, take, delay } from 'redux-saga/effects';
import { isSuccessfulAction } from 'typesafe-redux-helpers';
import { LOGIN } from './actions';
import { Logger } from '../utils/logger';

export function* loginSaga(action: ReturnType<typeof LOGIN.TRIGGER>): SagaIterator {
    yield put(LOGIN.STARTED(action.payload));

    try {
        if (action.payload.username === 'vlad' && action.payload.password === '123') {
            yield put(LOGIN.COMPLETED({ username: 'vlad', token: '123qwe' }));
        } else {
            yield put(LOGIN.COMPLETED.failed(new Error('Invalid credentials')));
        }
    } catch (err) {
        const error = new Error(err);

        yield call(Logger.error, error);
        yield put(LOGIN.COMPLETED.failed(error));
    }
}

export function* listenForLoginSaga(): SagaIterator {
    yield takeLatest(LOGIN.TRIGGER, loginSaga);
}
