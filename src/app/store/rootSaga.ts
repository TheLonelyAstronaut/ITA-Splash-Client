import { SagaIterator } from 'redux-saga';
import { call, spawn } from 'redux-saga/effects';
import { listenForLoginSaga } from '../authentication/sagas';

// import { listenForAccountDetailsTriggers } from '../account/account-details/sagas';

export function* rootSaga(): SagaIterator {
    yield spawn(listenForLoginSaga);
    // anything analytics related
    // yield spawn(listenForActions);
    // start off any listeners for actions + any module specific initialisation
    // can happen in the background
    // block root saga to run our initialisation logic, once this is done
    // the root saga 'finishes' and the splash screen will disappear
    // yield call(initialisationSaga);
}
