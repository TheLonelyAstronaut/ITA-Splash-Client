import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';

import { client } from '../../graphql/api';
import { SHOW_FLASHBAR } from '../utils/flashbar/actions';
import { FlashbarEnum } from '../utils/flashbar/flashbar.types';

import { CHANGE_PASSWORD } from './actions';

export function* changePasswordSaga(action: ReturnType<typeof CHANGE_PASSWORD.TRIGGER>): SagaIterator {
    if (
        action.payload.currentPass === action.payload.repeatNewPass &&
        action.payload.currentPass !== '' &&
        action.payload.newPass !== ''
    ) {
        yield call(client.changePassword, action.payload.currentPass, action.payload.newPass);
    } else {
        yield call(SHOW_FLASHBAR, { description: 'Something went wrong', type: FlashbarEnum.Danger, message: 'Ooops' });
    }
}

export function* listenForChangePasswordSaga(): SagaIterator {
    yield takeLatest(CHANGE_PASSWORD.TRIGGER, changePasswordSaga);
}
