import { showMessage } from 'react-native-flash-message';
import { SagaIterator } from 'redux-saga';
import { call, takeLatest } from 'redux-saga/effects';

import { SHOW_FLASHBAR } from './actions';

export function* flashbarSaga(action: ReturnType<typeof SHOW_FLASHBAR>): SagaIterator {
    yield call(showMessage, {
        type: action.payload.type,
        message: action.payload.message,
        description: action.payload?.description,
    });
}

export function* listenFlashbarSaga(): SagaIterator {
    yield takeLatest(SHOW_FLASHBAR, flashbarSaga);
}
