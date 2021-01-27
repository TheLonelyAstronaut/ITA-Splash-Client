import { Dispatch } from 'redux';
import { SagaIterator } from 'redux-saga';
import { spawn, call } from 'redux-saga/effects';

import { listenForLoginSaga } from '../authentication/sagas';
import { listenPlaySaga, listenControlSaga, listenAddToQueueSaga, listenSeekTo } from '../player/sagas';
import { initializationSaga } from '../utils/initialization-saga';

export function* rootSaga(dispatch: Dispatch): SagaIterator {
    yield spawn(listenForLoginSaga);
    yield spawn(listenPlaySaga);
    yield spawn(listenControlSaga);
    yield spawn(listenAddToQueueSaga);
    yield spawn(listenSeekTo);

    yield call(initializationSaga, dispatch);
}
