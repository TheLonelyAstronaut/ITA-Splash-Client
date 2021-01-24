import { SagaIterator } from 'redux-saga';
import { spawn, call } from 'redux-saga/effects';

import { listenForLoginSaga } from '../authentication/sagas';
import { listenNextSaga, listenPlaySaga, listenPrevSaga } from '../player/sagas';
import { initializationSaga } from '../utils/initialization-saga';

export function* rootSaga(): SagaIterator {
    yield spawn(listenForLoginSaga);
    yield spawn(listenPlaySaga);
    yield spawn(listenNextSaga);
    yield spawn(listenPrevSaga);

    yield call(initializationSaga);
}
