import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { Logger } from '../utils/logger';

import { LOGIN } from './actions';

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

// export function* listenForThemeSaga(): SagaIterator {
//     yield put(CHANGE_THEME)
// }
