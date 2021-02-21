import { Dispatch } from 'redux';
import { SagaIterator } from 'redux-saga';
import { spawn, call } from 'redux-saga/effects';

import { listenForLoginSaga, listenForLogoutSaga, listenForRegisterSaga } from '../authentication/sagas';
import { listenForChangePasswordSaga, listenForLoadHomepage } from '../home/sagas';
import { listenForAddPlaylistSaga, listenForLoadLibrarySaga } from '../library/sagas';
import { listenForLoadAlbumSaga, listenForLoadArtistSaga } from '../music-stack/sagas';
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
    yield spawn(listenForLoadLibrarySaga);
    yield spawn(listenForAddPlaylistSaga);
    yield spawn(listenForChangePasswordSaga);
    yield spawn(listenForLoadHomepage);
    yield spawn(listenForLoadArtistSaga);
    yield spawn(listenForLoadAlbumSaga);

    yield call(initializationSaga, dispatch);
}
