import { SagaIterator } from 'redux-saga';
import { spawn } from 'redux-saga/effects';

import { listenForLoginSaga } from '../authentication/sagas';
import { listenNextSaga, listenPauseSaga, listenPlaySaga, listenPrevSaga } from '../player/sagas';

export function* rootSaga(): SagaIterator {
    yield spawn(listenForLoginSaga);
    yield spawn(listenPlaySaga);
    yield spawn(listenPauseSaga);
    yield spawn(listenNextSaga);
    yield spawn(listenPrevSaga);
}
