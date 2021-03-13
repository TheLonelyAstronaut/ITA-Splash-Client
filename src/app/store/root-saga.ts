import { SagaIterator } from 'redux-saga';
import { spawn } from 'redux-saga/effects';

import { listenForLoginSaga, listenForLogoutSaga, listenForRegisterSaga } from '../authentication/sagas';
import { listenForChangePasswordSaga, listenForLoadHomepage } from '../home/sagas';
import { listenForAddPlaylistSaga } from '../library/sagas';
import {
    listenForAddToPlaylist,
    listenForFollowOrUnfollow,
    listenForLoadAlbumSaga,
    listenForLoadArtistSaga,
} from '../music-stack/sagas';
import { listenPlaySaga, listenControlSaga, listenAddToQueueSaga, listenSeekTo } from '../player/sagas';
import { listenForSearchSaga } from '../search/sagas';
import { listenFlashbarSaga } from '../utils/flashbar/sagas';
import { listenForInitializationSaga } from '../utils/initialization-saga';

export function* rootSaga(): SagaIterator {
    yield spawn(listenForLoginSaga);
    yield spawn(listenPlaySaga);
    yield spawn(listenControlSaga);
    yield spawn(listenAddToQueueSaga);
    yield spawn(listenSeekTo);
    yield spawn(listenFlashbarSaga);
    yield spawn(listenForRegisterSaga);
    yield spawn(listenForSearchSaga);
    yield spawn(listenForLogoutSaga);
    yield spawn(listenForAddPlaylistSaga);
    yield spawn(listenForChangePasswordSaga);
    yield spawn(listenForLoadHomepage);
    yield spawn(listenForLoadArtistSaga);
    yield spawn(listenForLoadAlbumSaga);
    yield spawn(listenForAddToPlaylist);
    yield spawn(listenForFollowOrUnfollow);
    yield spawn(listenForInitializationSaga);
}
