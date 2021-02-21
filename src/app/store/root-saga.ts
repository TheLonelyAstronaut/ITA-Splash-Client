import { Dispatch } from 'redux';
import { SagaIterator } from 'redux-saga';
import { spawn, call } from 'redux-saga/effects';

import { listenForLoginSaga, listenForLogoutSaga, listenForRegisterSaga } from '../authentication/sagas';
import { listenForChangePasswordSaga } from '../home/sagas';
import { listenForLoadHomepage } from '../home/sagas';
import { listenPlaySaga, listenControlSaga, listenAddToQueueSaga, listenSeekTo } from '../player/sagas';
import { listenForSearchSaga } from '../search/sagas';
import { listenFlashbarSaga } from '../utils/flashbar/sagas';
import { initializationSaga } from '../utils/initialization-saga';

export function* rootSaga(dispatch: Dispatch): SagaIterator {
    yield spawn(listenForLoginSaga);
    yield spawn(listenPlaySaga);
    yield spawn(listenControlSaga);
    yield spawn(listenAddToQueueSaga);
    yield spawn(listenSeekTo);
    yield spawn(listenFlashbarSaga);
    yield spawn(listenForRegisterSaga);
    yield spawn(listenForSearchSaga);
    yield spawn(listenForLogoutSaga);
    yield spawn(listenForChangePasswordSaga);
    yield spawn(listenForLoadHomepage);

    yield call(initializationSaga, dispatch);
}
