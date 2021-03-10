import RNTrackPlayer from 'react-native-track-player';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { firebase } from '../utils/firebase';
import { SHOW_FLASHBAR } from '../utils/flashbar/actions';
import { FlashbarEnum } from '../utils/flashbar/flashbar.types';
import { Logger } from '../utils/logger';

import { LOGIN, LOGOUT, REGISTER } from './actions';

export function* logoutSaga(): SagaIterator {
    yield call(client.logout);
    yield put(LOGOUT.COMPLETED());
    yield call(firebase.logout);
    yield call(RNTrackPlayer.stop);
    yield call(RNTrackPlayer.reset);
}

export function* registerSaga(action: ReturnType<typeof REGISTER.TRIGGER>): SagaIterator {
    try {
        const result = yield call(client.register, action.payload);
        yield put(REGISTER.COMPLETED(result));
        yield call(firebase.register, result);
    } catch (err) {
        const error = new Error(err);

        yield call(Logger.error, error);
        yield put(REGISTER.COMPLETED.failed(error));
        yield put(
            SHOW_FLASHBAR({
                type: FlashbarEnum.Danger,
                message: 'User with same email already exists',
                description: 'Try to login',
            })
        );
    }
}

export function* loginSaga(action: ReturnType<typeof LOGIN.TRIGGER>): SagaIterator {
    yield put(LOGIN.STARTED(action.payload));

    try {
        const result = yield call(client.login, action.payload);
        yield put(LOGIN.COMPLETED(result));
        yield call(firebase.login, result);
    } catch (err) {
        const error = new Error(err);
        yield call(Logger.error, error);
        yield put(LOGIN.COMPLETED.failed(error));
        yield put(
            SHOW_FLASHBAR({ type: FlashbarEnum.Danger, message: 'Incorrect user data', description: 'Try again' })
        );
    }
}

export function* listenForLogoutSaga(): SagaIterator {
    yield takeLatest(LOGOUT.TRIGGER, logoutSaga);
}

export function* listenForLoginSaga(): SagaIterator {
    yield takeLatest(LOGIN.TRIGGER, loginSaga);
}

export function* listenForRegisterSaga(): SagaIterator {
    yield takeLatest(REGISTER.TRIGGER, registerSaga);
}
